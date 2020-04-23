//var client = require('./elasticconnection.js');
var elasticsearch=require('elasticsearch');
var queryWithFilter = require('./query/queryWithFilter.js');
var queryWithNoFilter = require('./query/queryWithNoFilter.js');

var elasticSearchLauncher = function(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,res){

// todo: handle status, salesor, distributionchannel, division


var querybody;

var host = configuration.getElasticHost();
var port = configuration.getElasticPort();

var url;

if ( host == "localhost"){
  url='http://'+ host;
} else {
  url = 'https://'+ host;
}

if (null!=port && port!=""){
  url+=':'+port+'/';
} else {
  url+='/';
}

var client = new elasticsearch.Client( {  
  hosts: [
    url
  ]
});
/*
var elasticquery={  
    index: country,
    type: language,
    filterPath : ['hits.hits._source','hits.total.value'],
    body: querybody
  };
  if (null!=pageNumber&&null!=perPage){
    elasticquery.size = perPage;
    elasticquery.from = pageNumber;
  }
  */
 var elasticquery={};

// TODO:
var listOfColumns = configuration.getColumnParameters();
var fullListOfColumnsWithNGrams=[];

listOfColumns.forEach(element => { 
  fullListOfColumnsWithNGrams.push(element);
  fullListOfColumnsWithNGrams.push(element + "-NGRAM");
});

let myQueryBuilder;

if (filters.size>0)
{
  myQueryBuilder = new queryWithFilter(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams);
} else {
  myQueryBuilder = new queryWithNoFilter(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams);
}
  elasticquery = myQueryBuilder.getElasticQueryBody;  
  elasticquery.body = myQueryBuilder.getQueryBody;

  var aggregationsBody = myQueryBuilder.getElasticAggregationsBody;

  if ( null != aggregationsBody ){
    elasticquery.body.aggs = aggregationsBody;
  }


/* todo: use in case of error */
var elasticQueryValue=JSON.stringify(elasticquery);

client.search(elasticquery,function (error, response,status) {
    if (error){
        console.log("search error: "+error+" query:"+elasticquery)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");

      var resultJSON={};
      var resultString="";

      if (null!=response.hits&&null!=response.hits.hits&&response.hits.hits.length>=1)
      { 
        resultString="{\"items\":[";
        response.hits.hits.forEach(function(hit)
        {
          console.log(hit);
          resultString+=JSON.stringify(hit._source)+",";
        });
      
        resultString=resultString.slice(0, -1)+"]";
        resultString+=",\"details\":{\"totalHits\":"+response.hits.total.value+"}}";
        resultJSON = JSON.parse(resultString);

        if (null!=response.aggregations){
          resultJSON.details.aggregations = response.aggregations;
        }
      /*resultString = response.hits.hits;*/

    } else {
      resultString = "";
      resultJSON=resultString.parse();
    }
      res.send(resultJSON);
    }
});

}

module.exports = elasticSearchLauncher;  
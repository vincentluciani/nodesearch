//var client = require('./elasticconnection.js');
var elasticsearch=require('elasticsearch');
var queryWithFilter = require('./query/queryWithFilter.js');
var queryWithNoFilter = require('./query/queryWithNoFilter.js');

var mysearch = function(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,res){

// todo: handle status, salesor, distributionchannel, division
var resultString="[";

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

var elasticquery={  
    index: country,
    type: language,
    filterPath : ['hits.hits._source'],
    body: querybody
  };
  if (null!=pageNumber&&null!=perPage){
    elasticquery.size = perPage;
    elasticquery.from = pageNumber;
  }

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


var elasticQueryValue=JSON.stringify(elasticquery);

client.search(elasticquery,function (error, response,status) {
    if (error){
        console.log("search error: "+error+" query:"+elasticquery)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");

      if (null!=response.hits&&null!=response.hits.hits&&response.hits.hits.length>=1){
      response.hits.hits.forEach(function(hit){
        console.log(hit);
        resultString+=JSON.stringify(hit._source)+",";
      })
      resultString=resultString.slice(0, -1)+"]";
    } else {
      resultString="[]";
    }
      res.send(resultString);
    }
});

}

module.exports = mysearch;  
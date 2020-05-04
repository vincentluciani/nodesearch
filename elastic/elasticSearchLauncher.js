//var client = require('./elasticconnection.js');
var elasticsearch=require('elasticsearch');
var queryWithFilter = require('./query/queryWithFilter.js');
var queryWithNoFilter = require('./query/queryWithNoFilter.js');
var elasticSearchAnalyzer = require('./elasticResultAnalyzer.js');

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
    var resultString = "";
    var resultJSON={};
    if (error){
        console.error("search error: "+error+" query:"+elasticquery)
        resultJSON=resultString.parse();
    }
    else {
      var myElasticSearchAnalyzer = new elasticSearchAnalyzer(response);
      resultJSON = myElasticSearchAnalyzer.getResponse();
    }
    res.send(resultJSON);
});

}

module.exports = elasticSearchLauncher;  
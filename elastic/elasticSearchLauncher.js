
var elasticsearch=require('elasticsearch');
var queryWithFilter = require('./query/queryWithFilter.js');
var queryWithNoFilter = require('./query/queryWithNoFilter.js');
var elasticSearchAnalyzer = require('./elasticResultAnalyzer.js');


var elasticSearchLauncher = function(keyword,country,language,keywordtype,offset,pageSize,filters,configuration,res,lm,applicationCache,originalURL){

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

var elasticquery={};

var listOfColumns = configuration.getColumnParameters();
var fullListOfColumnsWithNGrams=[];

listOfColumns.forEach(element => { 
  fullListOfColumnsWithNGrams.push(element);
  fullListOfColumnsWithNGrams.push(element + "-NGRAM");
});

let myQueryBuilder;

if (Object.keys(filters).length>0)
{
  myQueryBuilder = new queryWithFilter(keyword,country,language,keywordtype,offset,pageSize,filters,configuration,fullListOfColumnsWithNGrams);
} else {
  myQueryBuilder = new queryWithNoFilter(keyword,country,language,keywordtype,offset,pageSize,filters,configuration,fullListOfColumnsWithNGrams);
}
  elasticquery = myQueryBuilder.getElasticQueryBody;  
  elasticquery.body = myQueryBuilder.getQueryBody;

  var aggregationsBody = myQueryBuilder.getElasticAggregationsBody;
  var highlightBody = myQueryBuilder.getHighlightBody;

  if ( null != aggregationsBody ){
    elasticquery.body.aggs = aggregationsBody;
  }

  if ( null != highlightBody ){
    elasticquery.body.highlight = highlightBody;
  }


try{
  
  client.search(elasticquery,function (error, response,status) {
      var resultJSON={};
      if (error){
        lm.logger.error("search error: "+error+" query:"+elasticquery)
          resultJSON={};
      }
      else {
        var myElasticSearchAnalyzer = new elasticSearchAnalyzer(response);
        resultJSON = myElasticSearchAnalyzer.getResponse();
      }
      res.send(resultJSON);
      applicationCache.set( originalURL, resultJSON )
      
  });
} catch (e){
  lm.logger.error("search error: "+e+" query:"+elasticquery);
  var resultJSON={};
  res.send(resultJSON);
}

}

module.exports = elasticSearchLauncher;  
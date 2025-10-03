
const { Client } = require('@elastic/elasticsearch');
var queryWithFilter = require('./query/queryWithFilter.js');
var queryWithNoFilter = require('./query/queryWithNoFilter.js');
var elasticSearchAnalyzer = require('./elasticResultAnalyzer.js');


var elasticSearchLauncher = function(keyword,country,language,keywordtype,offset,pageSize,filters,configuration,res,lm,applicationCache,originalURL){

var host = configuration.getElasticHost();
var port = configuration.getElasticPort();

// Check if we are inside Docker
// ES_HOST will be defined in docker-compose
const dockerEsHost = process.env.ES_HOST;

let esUrl;

if (dockerEsHost) {
  // Running inside Docker: use the full ES URL from env
  esUrl = dockerEsHost;
} else {
  // Running locally: keep your old logic
  if (host === "localhost") {
    esUrl = "http://" + host;
  } else {
    esUrl = "https://" + host;
  }

  if (port && port !== "") {
    esUrl += ":" + port + "/";
  } else {
    esUrl += "/";
  }
}

console.log(`Connecting to Elasticsearch at ${esUrl}`);

// Create client
const client = new Client({
  node: esUrl
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
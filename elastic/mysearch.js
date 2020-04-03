//var client = require('./elasticconnection.js');
var elasticsearch=require('elasticsearch');
var mysearch = function(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,res){

    // todo: handle status, salesor, distributionchannel, division
var resultString="[";

var querybody;

var client = new elasticsearch.Client( {  
  hosts: [
    'http://'+ configuration.getElasticHost() +':'+configuration.getElasticPort()+'/'
  ]
});

if (keywordtype == "PRODUCT_REFERENCE"){
    querybody={
        query: {
          match: { "reference": keyword }
        },
      };
} else if (keywordtype == "PRODUCT_DESCRIPTION"){
    querybody={
    query: {
      match: { "title": keyword }
    },
  };
} else {
    querybody={
        query: {
            "multi_match" : {
                "query":  keyword, 
                "fields": [ "reference", "title" ] 
              }
        },
      };
}

/*
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "reference": "LC1D09M7"
        }
      },
      "filter": {
        "term": {
          "distributionChannel": "30"
        }
      }
    }
  }
}
*/

/*
{
    "query": {
        "wildcard": {
            "user": {
                "value": "ki*y",
                "boost": 1.0,
                "rewrite": "constant_score"
            }
        }
    }
*/
var elasticquery={  
    index: 'myse_id',
    type: 'products',
    filterPath : ['hits.hits._source'],
    body: querybody
  };

  if (null!=pageNumber&&null!=perPage){
      elasticquery.size = perPage;
      elasticquery.from = pageNumber;
    }

client.search(elasticquery,function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
        resultString+=JSON.stringify(hit._source)+",";
      })
      resultString+="]";
      res.send(resultString);
    }
});

}

module.exports = mysearch;  
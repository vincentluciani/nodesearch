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

var url = 'https://'+ host;

if (null!=port && port!=""){
  url+=':'+port+'/';
} else {
  url+='/';
}
/*

url+="/_search?type=_doc&filter_path=hits.hits._source";

if (null!=pageNumber&&null!=perPage){
  url+="&size="+perPage+"&from="+pageNumber;
}*/

var client = new elasticsearch.Client( {  
  hosts: [
    url
  ]
});

if (keywordtype == "PRODUCT_REFERENCE"){
    querybody={
        query: {
          match: { "PRODUCT_REFERENCE": keyword }
        },
      };
} else if (keywordtype == "PRODUCT_DESCRIPTION"){
    querybody={
    query: {
      match: { "PRODUCT_DESCRIPTION": keyword }
    },
  };
} else {
    querybody={
        query: {
            "multi_match" : {
                "query":  keyword, 
                "fields": [ "PRODUCT_REFERENCE", "PRODUCT_DESCRIPTION" ] 
              }
        },
      };
}



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

Worked on postman:
https://vpc-use-srh-es-myse-lnlavs4da5mkg7bdtvsfixil4y.us-east-1.es.amazonaws.com/at-de/_search?type=_doc&filter_path=hits.hits._source&size=6&from=0

  
http://localhost:3333/at/de/search/api/guided/3303430325710?keywordType=PRODUCT_REFERENCE&p=1&perpage=9
failed
*/

var indexString = country + "-" + language;

var elasticquery={  
    index: indexString,
    type: '_doc',
    filterPath : ['hits.hits._source'],
    body: querybody
  };
  if (null!=pageNumber&&null!=perPage){
    elasticquery.size = perPage;
    elasticquery.from = pageNumber;
  }

// TODO:

let myQueryBuilder;

if (filters.size > 1){
  myQueryBuilder = new queryWithFilter(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration);
} else {
  myQueryBuilder = new queryWithNoFilter(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration);
}
  elasticquery = myQueryBuilder.getElasticQueryBody;  
  elasticquery.body = myQueryBuilder.getQueryBody;
  
// END TODO

var elasticQueryValue=JSON.stringify(elasticquery);

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
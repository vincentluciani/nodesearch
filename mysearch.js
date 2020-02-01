var client = require('./elasticconnection.js');

var mysearch = function(keyword,country,language,keywordtype,pageNumber,perPage,res){

var resultString="[";

var querybody;

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
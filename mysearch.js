var client = require('./elasticconnection.js');

var mysearch = function(keyword,country,language,res){

var resultString="[";

var elasticquery={  
    index: 'myse_id',
    type: 'products',
    filterPath : ['hits.hits._source'],
    body: {
      query: {
        match: { "reference": keyword }
      },
    }
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
        resultString+=JSON.stringify(hit._source);
      })
      resultString+="]";
      res.send(resultString);
    }
});

}

module.exports = mysearch;  
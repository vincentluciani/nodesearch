var client = require('./elasticconnection.js');

var mysearch = function(keyword,res){

client.search({  
  index: 'myse_id',
  type: 'products',
  filterPath : ['hits.hits._source'],
  body: {
    query: {
      match: { "reference": keyword }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
        res.send(hit._source);
      })
    }
});

}

module.exports = mysearch;  
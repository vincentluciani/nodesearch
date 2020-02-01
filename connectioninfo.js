var client = require('./elasticconnection.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});

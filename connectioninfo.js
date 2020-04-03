var client = require('./elastic/elasticconnection.js/index.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});

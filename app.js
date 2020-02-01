/*
Configuration:
npm install express
npm install winston
*/

var routers = require('./routers.js');
var express = require('express');
var configurationManager = require('./configurationManager.js');
var logManager = require('./logManager.js');

var app = express();

var configuration = new configurationManager(app);
var lm = new logManager(configuration);

lm.logger.info("Environment:"+configuration.getCurrentEnvironment());
// https://stackoverflow.com/questions/18931452/node-js-get-path-from-the-request
/*app.get('/test',function(req,res){
    res.send('hello world. Environment:<br>'+configuration.getCurrentEnvironment());
    res.send('Should provoke an error:<br>'+configuration.wrongFunction());
});*/

app.use('/',routers);

app.listen(3333);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    
    lm.logger.error(err.message);
  
  });

  

module.exports = app;
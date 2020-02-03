/*
Configuration:
npm install express
npm install winston
*/

//http://localhost:3333/us/en/search/api/guided/LC1D09M7?keywordType=PRODUCT_REFERENCE

var routers = require('./routers.js');
var express = require('express');
var logManager = require('./logManager.js');
var configurationManager = require('./configurationManager.js');

var app = express();

var configuration = new configurationManager(app);

var lm = new logManager(configuration);

lm.logger.info("Environment:"+configuration.getCurrentEnvironment());

app.use('/', function (req,res,next){
  req.magicparam="localhost";
  next();}
  ,routers);

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
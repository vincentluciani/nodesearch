/*
Configuration:
npm install express
npm install winston
*/

//http://localhost:3333/us/en/search/api/guided/LC1D09M7?keywordType=PRODUCT_REFERENCE
//http://localhost:3333/at/de/search/api/guided/PHASENTRENNER?keywordType=PRODUCT_DESCRIPTION&p=9&perpage=2
var fs = require('fs');
var http = require('http');
var https = require('https');

var routers = require('./routers.js');
var express = require('express');
var logManager = require('./logManager.js');
var configurationManager = require('./configurationManager.js');
var createError = require('createerror');

var app = express();

var configuration = new configurationManager(app);

var lm = new logManager(configuration);

lm.logger.info("Environment:"+configuration.getCurrentEnvironment());


var key = configuration.getPrivateKey();
var cert = configuration.getCertificate();
var bundle = configuration.getBundle();

var keyFile = fs.readFileSync(configuration.getPrivateKey());
var certFile = fs.readFileSync(configuration.getCertificate());
var bundleFile;
var options;

if ( configuration.getBundle() != "" )
{
  bundleFile = fs.readFileSync(configuration.getBundle);  
  options = {
    key: keyFile,
    ca: bundleFile,
    cert: certFile
  };
}
else {
  options = {
    key: keyFile,
    cert: certFile
  };
}


var httpsServer = https.createServer(app,options);
var httpServer = http.createServer(app);

app.use('/', function (req,res,next){
  req.configuration=configuration;
  next();}
  ,routers);

 httpsServer.listen(3331);

 httpServer.listen(3333);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    
    lm.logger.error(err.message);
  
  });

module.exports = app;
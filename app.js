/*
Configuration:
npm install express
npm install winston
*/
var fs = require('fs');
var https = require('https');
var routers = require('./routers.js');
var express = require('express');
var logManager = require('./logManager.js');
var configurationManager = require('./configurationManager.js');
var createError = require('createerror');
const NodeCache = require( "node-cache" );

var app =   express();


var configuration = new configurationManager(app);

var lm = new logManager(configuration);

lm.logger.info("Environment:"+configuration.getCurrentEnvironment());
var applicationCache = new NodeCache(configuration.getCacheConfiguration());

var key = configuration.getPrivateKey();
var cert = configuration.getCertificate();
var bundle = configuration.getBundle();

var keyFile = fs.readFileSync(key);
var certFile = fs.readFileSync(cert);
var bundleFile;
var options;

if ( bundle != "" )
{
  bundleFile = fs.readFileSync(bundle);  
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

var httpsServer = https.createServer(options,app);

try {
  app.use('/', function (req,res,next){
    req.configuration=configuration;
    req.applicationCache = applicationCache;
    req.lm = lm;
    next();}
    ,routers);

  var port = configuration.getNodePort();

  httpsServer.listen(port, "0.0.0.0", () => {
    lm.logger.info(`🚀 HTTPS Server running on port ${port}`);
  });

  httpsServer.on("error", (err) => {
    lm.logger.error(`❌ HTTPS server failed to start: ${err.message}`);
    console.error(err);
    process.exit(1); // exit container if server can’t start
  });

} catch (err) {
  lm.logger.error(`❌ Fatal error during server startup: ${err.message}`);
  console.error(err);
  process.exit(1);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    
    lm.logger.error(err.message);
    res.status(err.status || 500).json({ error: err.message });
  });

module.exports = app;
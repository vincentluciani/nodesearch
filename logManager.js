
var winston = require('winston');

class logManager {
  constructor(configuration) {
    this.logger = new (winston.createLogger)({
      transports: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: __dirname + '/logs/debug.log', json: false })
      ],
      exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: __dirname + '/logs/exceptions.log', json: false })
      ],
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      exitOnError: false
    });
    var environment = configuration.getCurrentEnvironment();
    if (environment == 'production') {
      this.logger.level = 'error';
    }
    else if (environment == 'development') {
      this.logger.level = 'debug';
    }
  }
}

module.exports = logManager;

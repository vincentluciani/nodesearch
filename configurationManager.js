class configurationManager {
    constructor(app) {
        var currentEnvironment;
        var configCommon = require('./config/config_common.json');
        var configSpecificToEnvironment;
        var configProduction = require('./config/config_production.json');
        var configDevelopment = require('./config/config_development.json');
        var host;
        var port;
        var queryBuildingParameters;
        var columnParameters;
        var aggregations;
        var certificate;
        var privateKey;
        var bundle;
        
        this.init = function (app) {
            currentEnvironment = app.get('env') || 'production';
            if (currentEnvironment == 'production') {
                configSpecificToEnvironment = configProduction;
            }
            else {
                configSpecificToEnvironment = configDevelopment;
            }
            host = configSpecificToEnvironment.elastic.host;
            port = configSpecificToEnvironment.elastic.port;
            queryBuildingParameters = configCommon.queryBuildingParameters;
            columnParameters = configCommon.queryBuildingParameters.columnParameters;
            aggregations = configCommon.queryBuildingParameters.aggregations;
            certificate = configSpecificToEnvironment.sslOptions.cert;
            privateKey = configSpecificToEnvironment.sslOptions.key;
            bundle = configSpecificToEnvironment.sslOptions.ca;

        };
        this.getCurrentEnvironment = function () {
            return currentEnvironment;
        };
        this.getElasticHost = function () {
            return host;
        };
        this.getElasticPort = function () {
            return port;
        };
        this.getQueryBuildingParameters = function () {
            return queryBuildingParameters;
        }
        this.getColumnParameters = function(){
            return columnParameters;
        }
        this.getAggregations = function(){
            return aggregations;
        }
        this.getPrivateKey = function(){
            return privateKey;
        }
        this.getCertificate = function(){
            return certificate;
        }
        this.getBundle = function(){
            return bundle;
        }
        this.init(app);

    }
}
module.exports = configurationManager;
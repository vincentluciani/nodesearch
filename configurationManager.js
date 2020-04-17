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
        this.init(app);
    }
}
module.exports = configurationManager;
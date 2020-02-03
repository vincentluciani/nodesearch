var configurationManager = function(app){

    var currentEnvironment;
    var configCommon=require('./config/config_common.json');
    var configSpecificToEnvironment;
    var configProduction=require('./config/config_production.json');
    var configDevelopment=require('./config/config_development.json');
    
    var clientID;
    var clientSecret;
    var brainstriveSecret;

    this.init = function(app)
    {
        currentEnvironment = app.get('env')||'production';
        if ( currentEnvironment == 'production' )
        {
            configSpecificToEnvironment = configProduction;
        }
        else
        {
            configSpecificToEnvironment = configDevelopment;
        }

        host = configSpecificToEnvironment.elastic.host;
        port = configSpecificToEnvironment.elastic.port;
    }
    this.getCurrentEnvironment = function(){
        return currentEnvironment;
    }
    this.getElasticHost = function(){
        return clientID;
    }
    this.getElasticPort = function(){
        return clientSecret;
    }    

    this.init(app);
}
module.exports = configurationManager;
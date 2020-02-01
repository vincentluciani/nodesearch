var configurationManager = function(app){

    var currentEnvironment;
    var configCommon=require('./config_common.json');
    var configSpecificToEnvironment;
    var configProduction=require('./config_production.json');
    var configDevelopment=require('./config_development.json');
    
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

        clientID = configSpecificToEnvironment.facebookClient.clientID;
        clientSecret =  configSpecificToEnvironment.facebookClient.clientSecret
        brainstriveSecret = configCommon.secret;
    }
    this.getCurrentEnvironment = function(){
        return currentEnvironment;
    }
    this.getClientID = function(){
        return clientID;
    }
    this.getClientSecret = function(){
        return clientSecret;
    }    
    this.getBrainstriveSecret = function(){
        return brainstriveSecret;
    }

    this.init(app);
}
module.exports = configurationManager;
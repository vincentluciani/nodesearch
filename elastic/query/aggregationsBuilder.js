class aggregationsBuilder{

    /*
        "aggs" : {
        "salesOrganization" : {
            "terms" : { "field" : "salesOrganization" } 
        },
                "genres2" : {
            "terms" : { "field" : "sdfsd" } 
        },
    }*/
    constructor(listOfAggregates){

        var aggregates={};

        listOfAggregates.forEach(function(aggregateName)
        {
            if ( null != aggregateName && aggregateName != "")
            {
                aggregates[aggregateName] = {};
                aggregates[aggregateName].terms =  {"field":aggregateName};  
            }
        });

        this.aggregates = aggregates;
    }

    getAggregationBody(){
        return this.aggregates;
    }
}
module.exports = aggregationsBuilder

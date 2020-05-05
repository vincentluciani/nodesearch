class aggregationsBuilder{

    constructor(listOfAggregates,subAggregates){

        var aggregates={};

        /*listOfAggregates.forEach(function(aggregateName)
        {
            if ( null != aggregateName && aggregateName != "")
            {
                aggregates[aggregateName] = {};
                aggregates[aggregateName].terms =  {"field":aggregateName};  
            }
        });*/
        for (var i=0; i< listOfAggregates.length ;i++){
            var aggregateName = listOfAggregates[i];
            if ( null != aggregateName && aggregateName != "")
            {
                aggregates[aggregateName] = {};
                aggregates[aggregateName].terms =  {"field":aggregateName};  
                if ( null != subAggregates[i]){
                    aggregates[aggregateName].aggs={
                        "subCategory":
                        {
                            "terms" : { "field" : subAggregates[i] } 
                        }
                    }
                }
            }
        }

        this.aggregates = aggregates;
    }

    getAggregationBody(){
        return this.aggregates;
    }
}
module.exports = aggregationsBuilder

var aggregationsBuilder = require('./aggregationsBuilder.js');

class query{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams){
        
        this.elasticQueryBody = {  
            index: country,
            type: language,
            filterPath : ['hits.hits._source','hits.total.value','aggregations']          
          };
        
          if (null!=pageNumber&&null!=perPage){
                this.elasticQueryBody.size = perPage;
                this.elasticQueryBody.from = pageNumber;
            }
        
        var ab = new aggregationsBuilder(configuration.getAggregations(),configuration.getSubAggregations());
        this.aggregationsBody = ab.getAggregationBody();
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }

    get getElasticAggregationsBody(){
        return this.aggregationsBody;
    }
}
module.exports = query

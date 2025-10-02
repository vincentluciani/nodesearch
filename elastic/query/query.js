var aggregationsBuilder = require('./aggregationsBuilder.js');

class query{
    constructor(keyword,country,language,keywordtype,offset,pageSize,filters,configuration,fullListOfColumnsWithNGrams){
        
        this.elasticQueryBody = {  
            index: country,
            filterPath : ['hits.hits._source','hits.total.value','aggregations','hits.hits.highlight']          
          };
        
          if (null!=offset&&null!=pageSize){
                this.elasticQueryBody.size = pageSize;
                this.elasticQueryBody.from = offset;
            }
        
        var ab = new aggregationsBuilder(configuration.getAggregations(),configuration.getSubAggregations());
        this.aggregationsBody = ab.getAggregationBody();

        this.highlightBody = {
                "fields" :[ {
                    "question" : {}
                },
                {
                    "answer" : {}
                }]
        }
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }

    get getHighlightBody(){
        return this.highlightBody;
    }

    get getElasticAggregationsBody(){
        return this.aggregationsBody;
    }
}
module.exports = query

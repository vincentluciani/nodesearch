var aggregationsBuilder = require('./aggregationsBuilder.js');

class query{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams){
        
        this.elasticQueryBody = {  
            index: country,
            type: language,
            filterPath : ['hits.hits._source','hits.total.value','aggregations','hits.hits.highlight']          
          };
        
          if (null!=pageNumber&&null!=perPage){
                this.elasticQueryBody.size = perPage;
                this.elasticQueryBody.from = pageNumber;
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

var query = require('./query.js');
var filtersBuilder = require('./filtersBuilder.js');

class queryWithFilter extends query
{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams)
        var fb = new filtersBuilder(filters);
        var filterBody = fb.getFilterBody();

// todo: the first two can be put in one 


        var keywordTypeNgram = keywordtype + "-NGRAM";
        if (null != keywordtype && keywordtype != ""){
            this.queryBody = 
            {
                "query":
                {
                    "bool": {
                        "must": {
                            "query_string":
                            {
                                "query":keyword,
                                "fields": [ keywordtype,keywordTypeNgram] 
                            }
                        }
                    }
                }
            } ;
            
        } else 
        {
            this.queryBody = 
            {
                "query":
                {
                    "bool": {
                        "must": {
                            "query_string":
                            {
                                "query":keyword,
                                "fields": fullListOfColumnsWithNGrams
                            }
                        }
                    }
                }
            } 
        }

        this.queryBody.query.bool.filter = filterBody;
    }

    get getQueryBody(){
        return this.queryBody;
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }

}
module.exports = queryWithFilter
var query = require('./query.js');
var filtersBuilder = require('./filtersBuilder.js');

class queryWithFilter extends query
{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams)
        var fb = new filtersBuilder(filters);
        var filterBody = fb.getFilterBody();

       /* keyword="("+keyword+")^"+configuration.getProximity();*/

        var keywordTypeNgram = keywordtype + "-NGRAM";
        if (null != keywordtype && keywordtype != ""){
            this.queryBody = 
            {
                "query":
                {
                    "bool": {
                      /*  "must": {
                            "query_string":
                            {
                                "query":keyword,
                                "fields": [ keywordtype,keywordTypeNgram] 
                            }
                        }*/
                        "should" :[ 
                            {	
                             "query_string":
                             {
                                 "query":keyword,
                                 "fields": [ keywordtype,keywordTypeNgram]
                             }
                            },
                            {	
                                "query_string":
                                {
                                    "query":"\""+keyword+"\"^"+configuration.getProximity(),
                                    "fields": [ keywordtype,keywordTypeNgram],
                                    "boost":2
                                }
                            }
                        ]
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
                        /*"must": {
                            "query_string":
                            {
                                "query":keyword,
                                "fields": fullListOfColumnsWithNGrams
                            }
                        }*/
                        "should" :[ 
                            {	
                             "query_string":
                             {
                                 "query":keyword,
                                 "fields": fullListOfColumnsWithNGrams
                             }
                            },
                            ,
                            {	
                                "query_string":
                                {
                                    "query":"\""+keyword+"\"^"+configuration.getProximity(),
                                    "fields": fullListOfColumnsWithNGrams,
                                    "boost":2
                                }
                            }
                        ]
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
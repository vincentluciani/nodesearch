
var query = require('./query.js');

class queryWithNoFilter extends query
{

    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration,fullListOfColumnsWithNGrams)

        this.queryBody={};

        var keywordTypeNgram = keywordtype + "-NGRAM";
        if (null != keywordtype && keywordtype != ""){
            this.queryBody={
                query: {
                    /*query_string: 
                    {
                        query: keyword,
                        fields : [keywordtype,keywordTypeNgram] 
                    }*/
                    "bool": {
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
                }},
            };
        } else {
            this.queryBody={
                query: {
                    /*
                    query_string: 
                    {
                        query: keyword,
                        fields : fullListOfColumnsWithNGrams
                    }*/
                    "bool": {
                    "should" :[ 
                        {	
                         "query_string":
                         {
                             "query":keyword,
                             "fields": fullListOfColumnsWithNGrams
                         }
                        },
                        {	
                            "query_string":
                            {
                                "query":"\""+keyword+"\"^"+configuration.getProximity(),
                                "fields": fullListOfColumnsWithNGrams,
                                "boost":2
                            }
                        }
                    ]
                }},
            };
        }  

    }
    get getQueryBody(){
        return this.queryBody;
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }
}
module.exports = queryWithNoFilter



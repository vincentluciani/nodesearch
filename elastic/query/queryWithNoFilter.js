
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
                    query_string: 
                    {
                        query: keyword,
                        fields : [keywordtype,keywordTypeNgram] 
                    }
                },
            };
        } else {
            this.queryBody={
                query: {
                    query_string: 
                    {
                        query: keyword,
                        fields : fullListOfColumnsWithNGrams
                    }
                },
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



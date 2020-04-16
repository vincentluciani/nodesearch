
var query = require('./query.js');

class queryWithNoFilter extends query
{

    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)

        this.queryBody={};

        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody={
                query: {
                    query_string: 
                    {
                        query: keyword,
                        fields : ["PRODUCT_REFERENCE","PRODUCT_REFERENCE-NGRAM"] 
                    }
                },
            };
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){
            this.queryBody={
            query: {
                query_string: 
                {
                    query: keyword,
                    fields : ["PRODUCT_DESCRIPTION","PRODUCT_DESCRIPTION-NGRAM"]
                }
            },
        };
        } else {
            this.queryBody={
                query: {
                    query_string: 
                    {
                        query: keyword,
                        fields : [  "PRODUCT_REFERENCE", "PRODUCT_DESCRIPTION"] 
                    }
                },
            };
        }  

      /*  return this.queryBody;*/
    }
    get getQueryBody(){
        return this.queryBody;
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }
}
module.exports = queryWithNoFilter



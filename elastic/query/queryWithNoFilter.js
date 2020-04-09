
var query = require('./query.js');

class queryWithNoFilter extends query
{

    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)

        this.queryBody={};

        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody={
                query: {
                match: { "PRODUCT_REFERENCE": keyword }
                },
            };
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){
            this.queryBody={
            query: {
            match: { "PRODUCT_DESCRIPTION": keyword }
            },
        };
        } else {
            this.queryBody={
                query: {
                    "multi_match" : {
                        "query":  keyword, 
                        "fields": [ "PRODUCT_DESCRIPTION", "PRODUCT_REFERENCE" ] 
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



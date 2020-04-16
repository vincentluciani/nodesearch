var query = require('./query.js');
var filtersBuilder = require('./filtersBuilder.js');

class queryWithFilter extends query
{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)
        var fb = new filtersBuilder(filters);
        var filterBody = fb.getFilterBody();

// todo transform 
        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody = 
            {
                "bool": {
                    "must": {
                        "query_string":
                        {
                            "query":keyword,
                            "fields": [ "PRODUCT_REFERENCE","PRODUCT_REFERENCE-NGRAM"] 
                        }
                    }
                }
            } ;
            
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){

            this.queryBody = 
            {
                "bool": {
                    "must": {
                        "query_string":
                        {
                            "query":keyword,
                            "fields": [ "PRODUCT_DESCRIPTION","PRODUCT_DESCRIPTION-NGRAM"] 
                        }
                    }
                }
            } 

        } else 
        {
            this.queryBody = 
            {
                "bool": {
                    "must": {
                        "query_string":
                        {
                            "query":keyword,
                            "fields": [ "PRODUCT_DESCRIPTION","PRODUCT_REFERENCE","PRODUCT_REFERENCE-NGRAM"] 
                        }
                    }
                }
            } 
        }

        this.queryBody.bool.filter = filterBody;
    }

    get getQueryBody(){
        return this.queryBody;
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }

}
module.exports = queryWithFilter
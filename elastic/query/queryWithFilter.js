var query = require('./query.js');

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
                        "match": {
                        "reference": keyword
                        }
                    }
                }
            } ;
            
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){

            this.queryBody = 
            {
                "bool": {
                    "must": {
                        "match": {
                        "title": keyword
                        }
                    }
                }
            } 

        };

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
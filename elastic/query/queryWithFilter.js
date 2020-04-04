class queryWithFilter extends query
{
    super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){

        var fb = new filtersBuilder(filters);
        var filterBody = fb.getFilterBody();

// todo transform 
        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody.body = 
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

            this.queryBody.body = 
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

        this.queryBody.body.bool.filter = filterBody;
    }

    getQueryBody(){
        return this.queryBody;
    }

}
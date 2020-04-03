
class queryWithNoFilter extends query
{
    super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){

        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody.body={
                query: {
                match: { "reference": keyword }
                },
            };
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){
            this.queryBody.body={
            query: {
            match: { "title": keyword }
            },
        };
        } else {
            this.queryBody.body={
                query: {
                    "multi_match" : {
                        "query":  keyword, 
                        "fields": [ "reference", "title" ] 
                    }
                },
            };
        }  

        return this.queryBody;
    }
}




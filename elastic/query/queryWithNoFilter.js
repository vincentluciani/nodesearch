
class queryWithNoFilter extends query
{
    super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){

        if (keywordtype == "PRODUCT_REFERENCE"){
            this.queryBody.body={
                query: {
                match: { "PRODUCT_REFERENCE": keyword }
                },
            };
        } else if (keywordtype == "PRODUCT_DESCRIPTION"){
            this.queryBody.body={
            query: {
            match: { "PRODUCT_DESCRIPTION": keyword }
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
    getQueryBody(){
        return this.queryBody;
    }
}
modules.exports = queryWithNoFilter



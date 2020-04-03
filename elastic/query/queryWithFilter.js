class queryWithFilter extends query
{
    super(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration)
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){

       /* this.queryBody.body = 
        {
            "bool": {
                "must": {
                    "match": {
                    "reference": keyword
                    }
                },
                "filter": {
                    "term": {
                    "distributionChannel": "30"
                    }
                }
            }
        } 
        */
//obj[name] = value
        this.queryBody.bool['filter'] = {
                                "term": {
                    "distributionChannel": "30"
        }


// multiple filters:
// make a class for filters
"filter": {
                 "and": {
                     "filters": 
                     [
                         {
                             "term": {
                                 "doc.docType": "user"
                             }
                         },
                         {
                             "term": {
                                 "doc.data.profile.location" : "CA"
                             }
                         }
                     ]
                 }




// todo transform 
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





        return this.queryBody;
    }

}
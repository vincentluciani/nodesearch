class query{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        
        var indexString = country + "-" + language;
        
        var queryBody = {  
            index: indexString,
            type: '_doc',
            filterPath : ['hits.hits._source']          
          };
        
          if (null!=pageNumber&&null!=perPage){
                queryBody.size = perPage;
                queryBody.from = pageNumber;
            }
    }
}

modules.exports = query
// body: querybody
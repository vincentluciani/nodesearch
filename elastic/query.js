class query{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        var queryBody = {  
            index: 'at-de',
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
class query{
    constructor(keyword,country,language,keywordtype,pageNumber,perPage,filters,configuration){
        
        this.elasticQueryBody = {  
            index: country,
            type: language,
            filterPath : ['hits.hits._source']          
          };
        
          if (null!=pageNumber&&null!=perPage){
                this.elasticQueryBody.size = perPage;
                this.elasticQueryBody.from = pageNumber;
            }
    }
    get getElasticQueryBody(){
        return this.elasticQueryBody;
    }
}



module.exports = query
// body: querybody
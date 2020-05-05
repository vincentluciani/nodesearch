class elasticResultAnalyzer{

    constructor(response){

        this.resultJSON={};
        var resultString="";
  
        if (null!=response.hits&&null!=response.hits.hits&&response.hits.hits.length>=1)
        { 
          resultString="{\"items\":[";
          response.hits.hits.forEach(function(hit)
          {
            /*console.log(hit);*/
            if (hit.highlight){
              hit._source.highlight = hit.highlight;
              console.log(hit.highlight);
            }
            resultString+=JSON.stringify(hit._source)+",";
          });
        
          resultString=resultString.slice(0, -1)+"]";
          resultString+=",\"details\":{\"totalHits\":"+response.hits.total.value+"}}";
          this.resultJSON = JSON.parse(resultString);
  
          if (null!=response.aggregations){
            this.resultJSON.details.aggregations = response.aggregations;
          }
        /*resultString = response.hits.hits;*/
  
      } else {
        resultString = "";
        this.resultJSON={};
      }
    }

    getResponse(){
        return this.resultJSON;
    }
}
module.exports = elasticResultAnalyzer
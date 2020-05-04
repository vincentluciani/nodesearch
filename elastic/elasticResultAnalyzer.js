class elasticResultAnalyzer{

    constructor(response){

        console.log("--- Response ---");
        console.log(response);
        console.log("--- Hits ---");
  
        this.resultJSON={};
        var resultString="";
  
        if (null!=response.hits&&null!=response.hits.hits&&response.hits.hits.length>=1)
        { 
          resultString="{\"items\":[";
          response.hits.hits.forEach(function(hit)
          {
            console.log(hit);
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
        this.resultJSON=resultString.parse();
      }
    }

    getResponse(){
        return this.resultJSON;
    }
}
module.exports = elasticResultAnalyzer
class filterBuilder{

    /* 
todo
if (this.filters.length > 1) -->

"filter":
			{
				"bool": 
				{
					"must":
					[
						{"term":{"salesOrganization": "2010"}},
                    	{"term":{"distributionChannel" : "51"}}
                    ]
                }
	
            }
            
    */
    constructor(listOfFilters){

        this.filters=[];
        this.singleFilter={};

        for ( var filterName in listOfFilters ){
            if ( null != listOfFilters[filterName] && listOfFilters[filterName] != "")
            {
                var filterObject = {};
                filterObject[filterName] = listOfFilters[filterName];
                this.filters.push({
                    "term": filterObject
                    });
                this.singleFilter={"term":filterObject};
            }

        }

        this.filter={};

        if (this.filters.length > 1){
            this.filter= { "and": {
                "filters": this.filters
                        }};
        } else if (this.filters.length == 1){
            this.filter= this.singleFilter;
        }
    }

    getFilterBody(){
        return this.filter;
    }
}
module.exports = filterBuilder

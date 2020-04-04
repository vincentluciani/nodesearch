class filters{

    constructor(listOfFilters){

        if ( null != listOfFilters.status && listOfFilters.status != "" ){
            this.filters.push({
                "term": {"status": listOfFilters.status}
                });
            this.singleFilter={"status": listOfFilters.status};
        }

        if ( null != listOfFilters.salesOrg && listOfFilters.salesOrg != "" ){
            this.filters.push({
            "term": {"salesOrg": listOfFilters.salesOrg}
            });
            this.singleFilter={"salesOrg": listOfFilters.salesOrg};
        }

        if ( null != listOfFilters.distributionChannel && listOfFilters.distributionChannel != "" ){
            this.filters.push({
            "term": {"distributionChannel": listOfFilters.distributionChannel}
            });
            this.singleFilter={"distributionChannel": listOfFilters.distributionChannel};
        }

        if ( null != filters.division && filters.division != "" ){
            this.filters.push({
            "term": {"division": filters.division}
            });
            this.singleFilter={"division": listOfFilters.division};
        }


        if (this.filters.size > 1){
            this.filter= { "and": {
                "filters": this.filters
                        }};
        } else if (this.filters.size == 1){
            this.filter= this.singleFilter;
            }
        }
    }



}
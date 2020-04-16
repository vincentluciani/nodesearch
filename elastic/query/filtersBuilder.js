class filterBuilder{

    // TODO: use objectName["propertyName"] and construct propertyname
    

    constructor(listOfFilters){

        this.filters=[];
        this.singleFilter={};

        if ( null != listOfFilters.status && listOfFilters.status != "" ){
            this.filters.push({
                "term": {"status": listOfFilters.status}
                });
            this.singleFilter={"term":{"status": listOfFilters.status}};
        }

        if ( null != listOfFilters.salesOrganization && listOfFilters.salesOrganization != "" ){
            this.filters.push({
            "term": {"salesOrganization": listOfFilters.salesOrg}
            });
            this.singleFilter={"term":{"salesOrganization": listOfFilters.salesOrg}};
        }

        if ( null != listOfFilters.distributionChannel && listOfFilters.distributionChannel != "" ){
            this.filters.push({
            "term": {"distributionChannel": listOfFilters.distributionChannel}
            });
            this.singleFilter={"term":{"distributionChannel": listOfFilters.distributionChannel}};
        }

        if ( null != listOfFilters.division && listOfFilters.division != "" ){
            this.filters.push({
            "term": {"division": listOfFilters.division}
            });
            this.singleFilter={"term":{"division": listOfFilters.division}};
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

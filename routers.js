var express = require('express');
var elasticSearchLauncher = require('./elastic/elasticSearchLauncher.js');

var router = express.Router();

router.get('/:country/:language/search/api/guided/:keyword',function (req,res){

    var filters={};

    var listOfQueryParameters = req.
    configuration.getQueryBuildingParameters();
    for ( var item in req.query )
    {
        console.log("item in query:"+item);
        var isItemInListOfQueryParameters = listOfQueryParameters.allowedQueryParameters.includes(item);
        
        if (isItemInListOfQueryParameters){
            filters[item] = req.query[item];
        }
    }

    var ms = new elasticSearchLauncher(req.params.keyword,
        req.params.country,
        req.params.language,
        req.query.keywordType || "",
        parseInt(req.query.p,10) || 0,
        parseInt(req.query.perpage,10) || 6,
        filters,
        req.configuration,
        res);



})

module.exports = router;

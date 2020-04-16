var express = require('express');
var mysearch = require('./elastic/mysearch.js');

var router = express.Router();

router.get('/:country/:language/search/api/guided/:keyword',function (req,res){

    var filters = {
        status : req.query.status || "",
        salesOrganization : req.query.salesOrganization || "",
        distributionChannel : req.query.distributionChannel || "",
        division : req.query.division || "",
    };

    var ms = new mysearch(req.params.keyword,
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

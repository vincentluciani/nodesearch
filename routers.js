var express = require('express');
var mysearch = require('./mysearch.js');

var router = express.Router();

router.get('/:country/:language/search/api/guided/:keyword',function (req,res){
    var message = 'Search api. Country:'+req.params.country+'. Language:'+req.params.language+'. Keyword:'+req.params.keyword;

    if (req.query.keywordType){
        message+=' keywordType:'+req.query.keywordType;
    }
    var ms = new mysearch(req.params.keyword,
        req.params.country,
        req.params.language,
        req.query.keywordType || "",
        req.query.p || "",
        req.query.perpage || "",
        res);



})

module.exports = router;

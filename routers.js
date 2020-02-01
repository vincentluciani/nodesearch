var express = require('express');
var router = express.Router();

router.get('/:country/:language/search/api/guided/:keyword',function (req,res){
    var message = 'Search api. Country:'+req.params.country+'. Language:'+req.params.language+'. Keyword:'+req.params.keyword;

    if (req.query.keywordType){
        message+=' keywordType:'+req.query.keywordType;
    }
    res.send(message);

})

module.exports = router;

var express = require('express');
var elasticSearchLauncher = require('./elastic/elasticSearchLauncher.js');
var fs = require('fs');
var router = express.Router();

/*var routerpath=*/
router.get('/test/:file',function (req,res){

    var filters={};

    console.log("test started");


    var path="C:\\Dysk D\\test\\htmlcss\\"+req.params.file;
    var contentType;

    if ( req.params.file.search("html")>=0)
    {
        contentType="text/html";
    } else
    {
        contentType="test/plain";
    }

    fs.readFile(path,"utf8" ,function(err, contents){
        //console.log(contents);
        res.writeHead(200, {'Content-Type': contentType});
        //res.send(contents);
        res.write(contents);
        res.end();
        });

   // res.send(htmlPage);

})

router.get('/:country/:language/search/',function (req,res){

    var filters={};

    var listOfQueryParameters = req.configuration.getQueryBuildingParameters();
    for ( var item in req.query )
    {

        var isItemInListOfQueryParameters = listOfQueryParameters.allowedQueryParameters.includes(item);
        
        if (isItemInListOfQueryParameters){
            filters[item] = req.query[item];
        }
    }

    var ms = new elasticSearchLauncher(req.query.term,
        req.params.country,
        req.params.language,
        req.query.keywordType || "",
        parseInt(req.query.offset,10) || 0,
        parseInt(req.query.pageSize,10) || 6,
        filters,
        req.configuration,
        res,
        req.lm);



})



module.exports = router;

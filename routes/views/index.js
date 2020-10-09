var express = require('express');
var fs = require('fs');

var router = express.Router();


router.get('/', function(req, res, next) {
    let rawdata = fs.readFileSync('./public/dummy.json');
    let items = JSON.parse(rawdata);

    res.render('index', { items: items });
});

module.exports = router;
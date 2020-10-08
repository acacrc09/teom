var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/portafolio', function(req, res, next) {
    res.render('admin/portafolio');
});

router.get('/squads', function(req, res, next) {
    res.render('admin/squads');
});

module.exports = router;
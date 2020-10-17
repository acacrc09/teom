const express = require('express');
//var fs = require('fs');
const IndicatorsServices = require('../../services/indicators')
const indicatorsServices = new IndicatorsServices();
const router = express.Router();

sorting = function(a, b) {
    if (a.rate < b.rate) return -1
    if (a.rate > b.rate) return 1

    return 0
};

router.all('/', async function(req, res) {
    //let rawdata = fs.readFileSync('./public/dummy.json');
    //let items = JSON.parse(rawdata);
    let items = await indicatorsServices.getAll(req.body);
    console.log(items);
    res.render('index', {
        items: items.filter((item) => item.rate > 0).sort(sorting),
        req: req.body
    });
});

module.exports = router;
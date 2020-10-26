const express = require('express');

const IndicatorsServices = require('../../services/indicators')
const indicatorsServices = new IndicatorsServices();
const router = express.Router();

sorting = function(a, b) {
    if (a.rate < b.rate) return -1
    if (a.rate > b.rate) return 1

    return 0
};

router.all('/', async function(req, res) {
    let items = await indicatorsServices.getAll(req.body);
    //console.log(items);
    res.render('index', {
        items: items.filter((item) => item.rate > 0).sort(sorting),
        req: req.body
    });
});

router.all('/tarjeta', async function(req, res) {
    res.render('tarjeta');
});

router.all('/credito', async function(req, res) {
    res.render('credito');
});


module.exports = router;
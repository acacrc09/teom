const express = require('express');

const IndicatorsServices = require('../../services/indicators')
const indicatorsServices = new IndicatorsServices();
const router = express.Router();

sorting = function(a, b) {
    if (a.rate < b.rate) return -1
    if (a.rate > b.rate) return 1

    return 0
};

router.all('/:path(|hipotecario|portabilidad|credito)', async function(req, res) {
    let items;
    let path = (req.params.path == '' ? 'hipotecario' : req.params.path);

    switch (path) {
        case 'hipotecario':
            items = await indicatorsServices.getAll(req.body);
            items = items.filter((item) => item.rate > 0).sort(sorting);
    }

    res.render(path, {
        items: items,
        req: req.body,
        current: './' + path
    });
});

module.exports = router;
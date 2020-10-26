const assert = require('assert');
const fs = require('fs');
const IndicatorsServices = require('../../services/indicators');
const indicatorsServices = new IndicatorsServices();

/*describe('Probando API Indicators', async () => {
    it('Debe devolver elementos', () => {
        assert.equal(, 2);
    });
});*/

/*test('Probando API Indicators', async() => {
    let indicators = await indicatorsServices.getAll({});

    expect(indicators).not.toHaveLength(0);
});*/

test('Probando API Indicators Dummy', async() => {
    let rawdata = fs.readFileSync('./public/dummy.json');
    let items = JSON.parse(rawdata);

    expect(items).not.toHaveLength(0);
});
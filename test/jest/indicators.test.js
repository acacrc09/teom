const assert = require('assert');
const IndicatorsServices = require('../../services/indicators');
const indicatorsServices = new IndicatorsServices();

/*describe('Probando API Indicators', async () => {
    it('Debe devolver elementos', () => {
        assert.equal(, 2);
    });
});*/

test('Probando API Indicators', () => {
    let indicators = await indicatorsServices.getAll();

    expect(indicators).not.toHaveLength(0);
});
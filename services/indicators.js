const _ = require('lodash');
const MongoLib = require('../lib/mongo');
const { fetchData: rankiaData } = require('../lib/rankia');
const { fetchData: bcclData } = require('../lib/bancoCentral');
const { calculateCredit } = require('./calculator');

const getNewIndicatorObject = ({ indicator, value, initial, years, uf }) => {
    const { rate } = indicator;
    const {
        monthlyCost,
        monthlyCostUf,
        totalCost,
        totalCostUf,
        loanValue,
        loanValueUf,
    } = calculateCredit({
        rate,
        value,
        initial,
        years,
        uf,
    });
    return {
        ...indicator,
        monthlyCost: monthlyCost ? monthlyCost : 0,
        monthlyCostUf: monthlyCostUf ? monthlyCostUf : 0,
        totalCost: totalCost ? totalCost : 0,
        totalCostUf: totalCostUf ? totalCostUf : 0,
        loanValue: loanValue ? loanValue : 0,
        loanValueUf: loanValueUf ? loanValueUf : 0,
    };
};

class IndicatorsSrevices {
    constructor() {
        this.collection = 'indicator';
        this.mongoDB = new MongoLib();
    }

    async getAll({ value, initial, years }) {
        const query = {};
        const { uf } = await bcclData();
        const indicators = await this.mongoDB.getAll(this.collection, query);
        let newIndicators = [];
        indicators &&
            indicators.map(async(indicator) => {
                const newIndicator = getNewIndicatorObject({
                    indicator,
                    value,
                    initial,
                    years,
                    uf,
                });
                newIndicators.push(newIndicator);
            });
        return newIndicators || [];
    }

    async get({ id, value, initial, years }) {
        const indicator = await this.mongoDB.get(this.collection, id);
        const { uf } = await bcclData();
        const newIndicator = getNewIndicatorObject({
            indicator,
            value,
            initial,
            years,
            uf,
        });
        return newIndicator || {};
    }
    async create({ body }) {
        let result;
        if (_.isEmpty(body)) {
            const bodyRankia = await rankiaData();
            result = await this.mongoDB.createAll(this.collection, bodyRankia);
        } else {
            result = await this.mongoDB.create(this.collection, body);
        }
        return result;
    }

    async update({ id, body }) {
        const updateIndicatorId = await this.mongoDB.update(
            this.collection,
            id,
            body
        );
        return updateIndicatorId;
    }

    async delete({ id }) {
        const deletedIndicatorId = await this.mongoDB.delete(this.collection, id);
        return deletedIndicatorId;
    }
}

module.exports = IndicatorsSrevices;
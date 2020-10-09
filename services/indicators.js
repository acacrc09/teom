const indicatorsMock = require('../utils/moks/indicators');
const MongoLib = require("../lib/mongo");
const _ = require('lodash');

class IndicatorsSrevices {
  constructor() {
    this.collection = "indicator";
    this.mongoDB = new MongoLib();
  }

  async getAll() {
    const query = {};
    const indicators = await this.mongoDB.getAll(this.collection, query);

    return indicators || [];
    //return Promise.resolve({ indicators: indicatorsMock });
  }

  async get({ id }) {
    const indicator = await this.mongoDB.get(this.collection, id);
    return indicator || {};
    //return Promise.resolve({ indicator: _.find(indicatorsMock, { id }) });
  }

  async create({ body }) {
    console.log('llego');
    
    const createIndicatorId = await this.mongoDB.create(this.collection, body);

    return createIndicatorId;

    //return Promise.resolve({ newIndicator: body });
  }

  async update({ id, body }) {

    const updateIndicatorId = await this.mongoDB.update(
      this.collection,
      id,
      body
    );
    return updateIndicatorId;
    
    //return Promise.resolve({
    //  newIndicator: body,
    //  oldIndicator: _.find(indicatorsMock, { id }),
    //});
  }

  async delete({ id }) {

    const deletedIndicatorId = await this.mongoDB.delete(
      this.collection,
      id
    );

    return deletedIndicatorId;

    //return Promise.resolve({ oldIndicator: _.find(indicatorsMock, { id }) });
  }
}

module.exports = IndicatorsSrevices;

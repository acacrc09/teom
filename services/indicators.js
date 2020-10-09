const MongoLib = require('../lib/mongo');

class IndicatorsSrevices {
  constructor() {
    this.collection = 'indicator';
    this.mongoDB = new MongoLib();
  }

  async getAll() {
    const query = {};
    const indicators = await this.mongoDB.getAll(this.collection, query);

    return indicators || [];
  }

  async get({ id }) {
    const indicator = await this.mongoDB.get(this.collection, id);
    return indicator || {};
  }

  async create({ body }) {
    let result;
    if (Array.isArray(body)) {
      result = await this.mongoDB.createAll(this.collection, body);
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

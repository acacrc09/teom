const indicatorsMock = require('../utils/moks/indicators');
const _ = require('lodash');

class IndicatorsSrevices {
  constructor() {}

  getAll() {
    return Promise.resolve({ indicators: indicatorsMock });
  }

  get({ id }) {
    return Promise.resolve({ indicator: _.find(indicatorsMock, { id }) });
  }

  create({ body }) {
    console.log('llego');
    return Promise.resolve({ newIndicator: body });
  }

  update({ id, body }) {
    return Promise.resolve({
      newIndicator: body,
      oldIndicator: _.find(indicatorsMock, { id }),
    });
  }

  delete({ id }) {
    return Promise.resolve({ oldIndicator: _.find(indicatorsMock, { id }) });
  }
}

module.exports = IndicatorsSrevices;

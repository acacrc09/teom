const express = require('express');
const IndicatorsServices = require('../../services/indicators');

const router = express.Router();
const indicatorsServices = new IndicatorsServices();

router.get('/', async (req, res, next) => {
  try {
    const { total, initial, term } = req.query;
    const indicators = await indicatorsServices.getAll({
      total,
      initial,
      term,
    });
    res.status(200).json(indicators);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const indicator = await indicatorsServices.get({ id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const indicator = await indicatorsServices.create({ body });
    res.status(201).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const indicator = await indicatorsServices.update({ body, id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const indicator = await indicatorsServices.delete({ id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

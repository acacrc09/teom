const express = require('express');
const IndicatorsSrevices = require('../../services/indicators');

const router = express.Router();
const indicatorsSrevices = new IndicatorsSrevices();

router.get('/', async (req, res, next) => {
  try {
    const indicators = await indicatorsSrevices.getAll();
    res.status(200).json(indicators);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const indicator = await indicatorsSrevices.get({ id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const indicator = await indicatorsSrevices.create({ body });
    res.status(201).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const indicator = await indicatorsSrevices.update({ body, id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const indicator = await indicatorsSrevices.delete({ id });
    res.status(200).json(indicator);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

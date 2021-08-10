const express = require('express');

const IndicatorsServices = require('../../services/indicators');
const indicatorsServices = new IndicatorsServices();
const router = express.Router();

sorting = function (a, b) {
  if (a.rate < b.rate) return -1;
  if (a.rate > b.rate) return 1;

  return 0;
};

router.all(
  '/:path(|hipotecario|portabilidad|credito)',
  async function (req, res) {
    let items;
    let path = req.params.path == '' ? 'hipotecario' : req.params.path;
    switch (path) {
      case 'hipotecario':
        items = await indicatorsServices.getAll(req.body);
        // REVIEW se agrega llenado automático de la base datos
        if (items.length === 0) {
          try {
            console.log('########## Ejecutando llenado de la base de datos');
            await indicatorsServices.create({});
            console.log(
              '########## Llenado de la base de datos completado con éxito'
            );
          } catch {
            console.log(
              '########## Ocurrió un error al llenar la base de datos'
            );
          } finally {
            items = await indicatorsServices.getAll(req.body);
          }
        } else {
          console.log('########## La base de datos tiene datos cargados');
        }
        items = items.filter((item) => item.rate > 0).sort(sorting);
    }

    res.render(path, {
      items: items,
      req: req.body,
      current: './' + path,
    });
  }
);

module.exports = router;

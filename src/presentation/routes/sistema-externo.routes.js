const express = require('express');

function createSistemaExternoRouter(sistemaExternoController) {
  const router = express.Router();

  router.get('/', sistemaExternoController.getAll);

  return router;
}

module.exports = createSistemaExternoRouter;
const express = require('express');

function createTipoTramiteRouter(controller) {
  const router = express.Router();

  router.get('/', controller.getAll);

  return router;
}

module.exports = createTipoTramiteRouter;
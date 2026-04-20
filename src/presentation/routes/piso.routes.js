const express = require('express');

function createPisoRouter(pisoController) {
  const router = express.Router();

  router.get('/', pisoController.getAll);

  return router;
}

module.exports = createPisoRouter;
const express = require('express');

function createOficinaRouter(oficinaController) {
  const router = express.Router();

  router.get('/', oficinaController.getAll);

  return router;
}

module.exports = createOficinaRouter;
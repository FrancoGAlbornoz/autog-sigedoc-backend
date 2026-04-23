const express = require('express');

function createPisoRouter(controller) {
  const router = express.Router();

  /**
   * @swagger
   * /api/pisos:
   *   get:
   *     summary: Obtener todos los pisos
   *     tags: [Pisos]
   *     responses:
   *       200:
   *         description: Lista de pisos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Piso'
   */
  router.get('/', controller.getAll);

  return router;
}

module.exports = createPisoRouter;
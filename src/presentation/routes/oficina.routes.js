const express = require('express');

function createOficinaRouter(controller) {
  const router = express.Router();

  /**
   * @swagger
   * /api/oficinas:
   *   get:
   *     summary: Obtener todas las oficinas
   *     tags: [Oficinas]
   *     responses:
   *       200:
   *         description: Lista de oficinas
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
   *                     $ref: '#/components/schemas/Oficina'
   */
  router.get('/', controller.getAll);

  return router;
}

module.exports = createOficinaRouter;
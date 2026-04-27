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

  /**
   * @swagger
   * /api/pisos/{idPiso}/oficinas:
   *   get:
   *     summary: Obtener oficinas por piso
   *     tags: [Oficinas]
   *     parameters:
   *       - in: path
   *         name: idPiso
   *         required: true
   *         schema:
   *           type: integer
   *         example: 1
   *     responses:
   *       200:
   *         description: Lista de oficinas del piso
   */
  router.get('/piso/:idPiso', controller.getByPiso);

  return router;
}

module.exports = createOficinaRouter;
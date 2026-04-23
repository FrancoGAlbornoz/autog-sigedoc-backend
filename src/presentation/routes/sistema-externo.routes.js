const express = require('express');

function createSistemaExternoRouter(controller) {
  const router = express.Router();

  /**
   * @swagger
   * /api/sistemas-externos:
   *   get:
   *     summary: Obtener todos los sistemas externos
   *     tags: [Sistemas Externos]
   *     responses:
   *       200:
   *         description: Lista de sistemas externos
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
   *                     type: object
   *                     properties:
   *                       id_sistema:
   *                         type: integer
   *                         example: 1
   *                       nombre_sistema:
   *                         type: string
   *                         example: SIGEDOC
   */
  router.get('/', controller.getAll);

  return router;
}

module.exports = createSistemaExternoRouter;
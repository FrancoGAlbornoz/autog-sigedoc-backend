const express = require('express');

function createTipoTramiteRouter(controller) {
  const router = express.Router();

  /**
   * @swagger
   * /api/tipos-tramite:
   *   get:
   *     summary: Obtener todos los tipos de trámite
   *     tags: [Tipos de Trámite]
   *     responses:
   *       200:
   *         description: Lista de tipos de trámite
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
   *                       id_tipo_tramite:
   *                         type: integer
   *                         example: 1
   *                       nombre_tramite:
   *                         type: string
   *                         example: Alta
   */
  router.get('/', controller.getAll);

  return router;
}

module.exports = createTipoTramiteRouter;
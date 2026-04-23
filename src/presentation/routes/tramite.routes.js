const express = require('express');

function createTramiteRouter(controller) {
  const router = express.Router();

  /**
   * @swagger
   * /api/tramites:
   *   post:
   *     summary: Crear un nuevo trámite
   *     tags: [Trámites]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id_oficina
   *               - id_sistema
   *               - id_tipo_tramite
   *               - apellido_encargado
   *               - nombre_encargado
   *               - detalles
   *             properties:
   *               id_oficina:
   *                 type: integer
   *                 example: 1
   *               id_sistema:
   *                 type: integer
   *                 example: 1
   *               id_tipo_tramite:
   *                 type: integer
   *                 example: 1
   *               apellido_encargado:
   *                 type: string
   *                 example: García
   *               nombre_encargado:
   *                 type: string
   *                 example: Juan
   *               cargo:
   *                 type: string
   *                 example: Analista
   *               telefono:
   *                 type: string
   *                 example: "3814123456"
   *               email:
   *                 type: string
   *                 example: juan@empresa.com
   *               detalles:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     apellido:
   *                       type: string
   *                       example: Pérez
   *                     nombres:
   *                       type: string
   *                       example: Carlos
   *                     cuil:
   *                       type: string
   *                       example: 20-12345678-9
   *                     mail:
   *                       type: string
   *                       example: carlos@empresa.com
   *                     telefono:
   *                       type: string
   *                       example: "3814111111"
   *                     id_oficina:
   *                       type: integer
   *                       example: 1
   *                     perfil:
   *                       type: string
   *                       example: consulta
   *     responses:
   *       201:
   *         description: Trámite creado exitosamente
   *       400:
   *         description: Datos inválidos o faltantes
   *       500:
   *         description: Error interno del servidor
   */
  router.post('/', controller.create);

  /**
   * @swagger
   * /api/tramites:
   *   get:
   *     summary: Obtener todos los trámites
   *     tags: [Trámites]
   *     responses:
   *       200:
   *         description: Lista de trámites
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
   *                     $ref: '#/components/schemas/Tramite'
   */
  router.get('/', controller.getAll);

  /**
   * @swagger
   * /api/tramites/{id}:
   *   get:
   *     summary: Obtener un trámite por ID
   *     tags: [Trámites]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del trámite
   *         example: 1
   *     responses:
   *       200:
   *         description: Trámite encontrado
   *       404:
   *         description: Trámite no encontrado
   */
  router.get('/:id', controller.getById);

  /**
   * @swagger
   * /api/tramites/{id}/pdf:
   *   get:
   *     summary: Generar y descargar el PDF del trámite
   *     tags: [Trámites]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del trámite
   *         example: 1
   *     responses:
   *       200:
   *         description: PDF generado exitosamente
   *         content:
   *           application/pdf:
   *             schema:
   *               type: string
   *               format: binary
   *       404:
   *         description: Trámite no encontrado
   */
  router.get('/:id/pdf', controller.generarPdf);

  return router;
}

module.exports = createTramiteRouter;
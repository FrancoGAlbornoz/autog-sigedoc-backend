const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SIGEDOC API',
      version: '1.0.0',
      description: 'API para el sistema de autogestión de accesos SIGEDOC',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        Tramite: {
          type: 'object',
          properties: {
            id_tramite: { type: 'integer', example: 1 },
            id_oficina: { type: 'integer', example: 1 },
            id_sistema: { type: 'integer', example: 1 },
            id_tipo_tramite: { type: 'integer', example: 1 },
            apellido_encargado: { type: 'string', example: 'García' },
            nombre_encargado: { type: 'string', example: 'Juan' },
            cargo: { type: 'string', example: 'Analista' },
            telefono: { type: 'string', example: '3814123456' },
            email: { type: 'string', example: 'juan@empresa.com' },
            estado: { type: 'string', example: 'En proceso' },
            url_pdf: { type: 'string', example: null },
          },
        },
        Detalle: {
          type: 'object',
          properties: {
            id_detalle: { type: 'integer', example: 1 },
            id_tramite: { type: 'integer', example: 1 },
            apellido: { type: 'string', example: 'Pérez' },
            nombres: { type: 'string', example: 'Carlos' },
            cuil: { type: 'string', example: '20-12345678-9' },
            mail: { type: 'string', example: 'carlos@empresa.com' },
            telefono: { type: 'string', example: '3814111111' },
            id_oficina: { type: 'integer', example: 1 },
            perfil: { type: 'string', example: 'consulta' },
          },
        },
        Piso: {
          type: 'object',
          properties: {
            id_piso: { type: 'integer', example: 1 },
            nombre_piso: { type: 'string', example: 'Planta Baja' },
          },
        },
        Oficina: {
          type: 'object',
          properties: {
            id_oficina: { type: 'integer', example: 1 },
            nombre_oficina: { type: 'string', example: 'Servicio Contable' },
            id_piso: { type: 'integer', example: 1 },
          },
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.js'], // lee los comentarios de las rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
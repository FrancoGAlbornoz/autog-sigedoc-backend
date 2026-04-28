const express = require('express');
const cors = require('cors');
// Configuración de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.config');

// Middleware para manejo de errores
const errorHandler = require('./presentation/middlewares/error.middleware');

// Repositorios y casos de uso para Pisos
const pool = require('./infrastructure/storage/db/postgres');
const PostgresPisoRepository = require('./infrastructure/adapters/repositories/postgres-piso.repository');
const GetPisosUseCase = require('./application/use-cases/get-pisos.use-case');
const PisoController = require('./presentation/controllers/piso.controller');
const createPisoRouter = require('./presentation/routes/piso.routes');

// Repositorios y casos de uso para Oficinas

const PostgresOficinaRepository = require('./infrastructure/adapters/repositories/postgres-oficina.repository')
const GetOficinasUseCase = require('./application/use-cases/get-oficinas.use-case')
const GetOficinasByPisoUseCase = require('./application/use-cases/get-oficinas-by-piso.use-case');
const OficinaController = require('./presentation/controllers/oficina.controller')
const createOficinaRouter = require('./presentation/routes/oficina.routes')

// Repositorios y casos de uso para sistemas externos

const PostgresSistemaExternoRepository = require('./infrastructure/adapters/repositories/postgres-sistema-externo.repository')
const GetSistemasExternosUseCase = require('./application/use-cases/get-sistema-externo.use-case')
const SistemaExternoController = require('./presentation/controllers/sistema-externo.controller')
const createSistemaExternoRouter = require('./presentation/routes/sistema-externo.routes')

// Repositorios y casos de uso para Tipo de Tramites.
const PostgresTipoTramiteRepository = require("./infrastructure/adapters/repositories/postgres-tipo-tramite.repository")
const GetTipoTramitesUseCase = require('./application/use-cases/get-tipos-tramite.use-case')
const TipoTramiteController = require('./presentation/controllers/tipo-tramite.controller')
const createTipoTramiteRouter = require('./presentation/routes/tipo-tramite.routes')

// Repositorios y casos de uso para Tramites.
const PostgresTramiteRepository = require('./infrastructure/adapters/repositories/postgres-tramite.repository');
const CreateTramiteUseCase = require('./application/use-cases/create-tramite.use-case');
const TramiteController = require('./presentation/controllers/tramite.controller');
const createTramiteRouter = require('./presentation/routes/tramite.routes');

const GetAllTramitesUseCase = require('./application/use-cases/get-all-tramites.use-case')
const GetTramiteByIdUseCase = require('./application/use-cases/get-tramite-by-id.use-case')

const SubirDocumentoFirmadoUseCase = require('./application/use-cases/subir-documento-firmado.use-case');
const FirebaseStorageService = require('./infrastructure/storage/firebase-storage.service');

const GetTramitesByEstadoUseCase = require('./application/use-cases/get-tramites-by-estado.use-case');

// Caso de uso para generar PDF
const PdfGeneratorService = require('./infrastructure/pdf/pdf-generator.service');
const GenerarPdfUseCase = require('./application/use-cases/generar-pdf.use-case');

// Caso de uso para enviar notificación por email 
const SendGridEmailService = require('./infrastructure/email/sendgrid-email.service');
const EnviarNotificacionEmailUseCase = require('./application/use-cases/enviar-notificacion-email.use-case');




const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para verificar que el servidor está vivo
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de rutas para Pisos
const pisoRepository = new PostgresPisoRepository(pool);
const getPisosUseCase = new GetPisosUseCase(pisoRepository);
const pisoController = new PisoController(getPisosUseCase);

app.use('/api/pisos', createPisoRouter(pisoController));

// Configuración de rutas para Oficinas
const oficinaRepository = new PostgresOficinaRepository(pool);
const getOficinasUseCase = new GetOficinasUseCase(oficinaRepository);
const getOficinasByPisoUseCase = new GetOficinasByPisoUseCase(oficinaRepository);
const oficinaController = new OficinaController(getOficinasUseCase, getOficinasByPisoUseCase);

app.use('/api/oficinas', createOficinaRouter(oficinaController));


// Configuración de rutas para Sistemas Externos
const sistemaExternoRepository = new PostgresSistemaExternoRepository(pool);
const getSistemasExternosUseCase = new GetSistemasExternosUseCase(sistemaExternoRepository);
const sistemaExternoController = new SistemaExternoController(getSistemasExternosUseCase);

app.use('/api/sistemas-externos', createSistemaExternoRouter(sistemaExternoController));

// Configuración de rutas para Tipo de Tramites
const tipoTramiteRepository = new PostgresTipoTramiteRepository(pool);
const getTipoTramitesUseCase = new GetTipoTramitesUseCase(tipoTramiteRepository);
const tipoTramiteController = new TipoTramiteController(getTipoTramitesUseCase);

app.use('/api/tipos-tramite', createTipoTramiteRouter(tipoTramiteController));


// Configuración de rutas para Tramites
// El repositorio de Tramites se necesita tanto para los casos de uso de gestión de trámites como para la generación de PDFs, por eso se instancia aquí.
const tramiteRepository = new PostgresTramiteRepository(pool);

// Configuración del caso de uso para generar PDF
const pdfGeneratorService = new PdfGeneratorService();
const generarPdfUseCase = new GenerarPdfUseCase(tramiteRepository, pdfGeneratorService);

const sendGridEmailService = new SendGridEmailService();
const enviarNotificacionEmailUseCase = new EnviarNotificacionEmailUseCase(
  tramiteRepository,
  pdfGeneratorService,
  sendGridEmailService
);

const createTramiteUseCase = new CreateTramiteUseCase(tramiteRepository);
const getAllTramitesUseCase = new GetAllTramitesUseCase(tramiteRepository)
const getTramiteByIdUseCase = new GetTramiteByIdUseCase(tramiteRepository)
const firebaseStorageService = new FirebaseStorageService();
const subirDocumentoFirmadoUseCase = new SubirDocumentoFirmadoUseCase(tramiteRepository, firebaseStorageService, enviarNotificacionEmailUseCase);
const getTramitesByEstadoUseCase = new GetTramitesByEstadoUseCase(tramiteRepository);
const tramiteController = new TramiteController(createTramiteUseCase, getAllTramitesUseCase, getTramiteByIdUseCase, generarPdfUseCase, subirDocumentoFirmadoUseCase, getTramitesByEstadoUseCase);







app.use('/api/tramites', createTramiteRouter(tramiteController));

// Middleware de manejo de errores (debe ir al final, después de todas las rutas)
app.use(errorHandler);
module.exports = app;
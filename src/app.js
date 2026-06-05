const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.config');
const errorHandler = require('./presentation/middlewares/error.middleware');

const pool = require('./infrastructure/storage/db/postgres');
const PostgresPisoRepository = require('./infrastructure/adapters/repositories/postgres-piso.repository');
const GetPisosUseCase = require('./application/use-cases/get-pisos.use-case');
const PisoController = require('./presentation/controllers/piso.controller');
const createPisoRouter = require('./presentation/routes/piso.routes');

const PostgresOficinaRepository = require('./infrastructure/adapters/repositories/postgres-oficina.repository');
const GetOficinasUseCase = require('./application/use-cases/get-oficinas.use-case');
const GetOficinasByPisoUseCase = require('./application/use-cases/get-oficinas-by-piso.use-case');
const OficinaController = require('./presentation/controllers/oficina.controller');
const createOficinaRouter = require('./presentation/routes/oficina.routes');

const PostgresSistemaExternoRepository = require('./infrastructure/adapters/repositories/postgres-sistema-externo.repository');
const GetSistemasExternosUseCase = require('./application/use-cases/get-sistema-externo.use-case');
const SistemaExternoController = require('./presentation/controllers/sistema-externo.controller');
const createSistemaExternoRouter = require('./presentation/routes/sistema-externo.routes');

const PostgresTipoTramiteRepository = require("./infrastructure/adapters/repositories/postgres-tipo-tramite.repository");
const GetTipoTramitesUseCase = require('./application/use-cases/get-tipos-tramite.use-case');
const TipoTramiteController = require('./presentation/controllers/tipo-tramite.controller');
const createTipoTramiteRouter = require('./presentation/routes/tipo-tramite.routes');

const PostgresTramiteRepository = require('./infrastructure/adapters/repositories/postgres-tramite.repository');
const CreateTramiteUseCase = require('./application/use-cases/create-tramite.use-case');
const TramiteController = require('./presentation/controllers/tramite.controller');
const createTramiteRouter = require('./presentation/routes/tramite.routes');

const GetAllTramitesUseCase = require('./application/use-cases/get-all-tramites.use-case');
const GetTramiteByIdUseCase = require('./application/use-cases/get-tramite-by-id.use-case');
const SubirDocumentoFirmadoUseCase = require('./application/use-cases/subir-documento-firmado.use-case');
const FirebaseStorageService = require('./infrastructure/storage/firebase-storage.service');
const GetTramitesByEstadoUseCase = require('./application/use-cases/get-tramites-by-estado.use-case');

const PdfGeneratorService = require('./infrastructure/pdf/pdf-generator.service');
const GenerarPdfUseCase = require('./application/use-cases/generar-pdf.use-case');

// SE REEMPLAZA EL SERVICIO DE RESEND POR NODEMAILER
const NodemailerEmailService = require('./infrastructure/email/nodemailer-email.service');
const EnviarNotificacionEmailUseCase = require('./application/use-cases/enviar-notificacion-email.use-case');

const app = express();

// --- 1. CONFIGURACIÓN DE CORS ESTRICTO ---
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Solo estos métodos están permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Solo estos headers
  optionsSuccessStatus: 200 // Para compatibilidad
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- SERVIR ARCHIVOS ESTÁTICOS ---
// Esto permite que el frontend acceda a los PDFs usando URLs como:
// http://localhost:3001/storage/tramites/1/firmado.pdf
const basePath = process.env.LOCAL_STORAGE_PATH || '/home/sistema/storage/autogestion';
app.use('/storage', express.static(basePath));

// --- 2. CONFIGURACIÓN DE RATE LIMITING ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30, // Límite de 30 peticiones por IP cada 15 min
  message: {
    ok: false,
    message: 'Demasiadas peticiones desde esta IP. Por favor, intentá de nuevo en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicamos el escudo anti-spam SOLO a las rutas de la API (dejamos libre /health y docs por si acaso)
app.use('/api', limiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas Pisos
const pisoRepository = new PostgresPisoRepository(pool);
const getPisosUseCase = new GetPisosUseCase(pisoRepository);
const pisoController = new PisoController(getPisosUseCase);
app.use('/api/pisos', createPisoRouter(pisoController));

// Rutas Oficinas
const oficinaRepository = new PostgresOficinaRepository(pool);
const oficinaController = new OficinaController(
  new GetOficinasUseCase(oficinaRepository),
  new GetOficinasByPisoUseCase(oficinaRepository)
);
app.use('/api/oficinas', createOficinaRouter(oficinaController));

// Rutas Sistemas y Tipos
const sistemaExternoRepository = new PostgresSistemaExternoRepository(pool);
const sistemaExternoController = new SistemaExternoController(new GetSistemasExternosUseCase(sistemaExternoRepository));
app.use('/api/sistemas-externos', createSistemaExternoRouter(sistemaExternoController));

const tipoTramiteRepository = new PostgresTipoTramiteRepository(pool);
const tipoTramiteController = new TipoTramiteController(new GetTipoTramitesUseCase(tipoTramiteRepository));
app.use('/api/tipos-tramite', createTipoTramiteRouter(tipoTramiteController));

// Rutas Tramites
const tramiteRepository = new PostgresTramiteRepository(pool);
const pdfGeneratorService = new PdfGeneratorService();
const firebaseStorageService = new FirebaseStorageService();

// AHORA INSTANCIAMOS NODEMAILER
const emailService = new NodemailerEmailService();

// Casos de uso
const generarPdfUseCase = new GenerarPdfUseCase(tramiteRepository, pdfGeneratorService);
const enviarNotificacionEmailUseCase = new EnviarNotificacionEmailUseCase(tramiteRepository, emailService);
const subirDocumentoFirmadoUseCase = new SubirDocumentoFirmadoUseCase(tramiteRepository, firebaseStorageService, enviarNotificacionEmailUseCase);

const tramiteController = new TramiteController(
  new CreateTramiteUseCase(tramiteRepository),
  new GetAllTramitesUseCase(tramiteRepository),
  new GetTramiteByIdUseCase(tramiteRepository),
  generarPdfUseCase,
  subirDocumentoFirmadoUseCase,
  new GetTramitesByEstadoUseCase(tramiteRepository)
);

app.use('/api/tramites', createTramiteRouter(tramiteController));

app.use(errorHandler);
module.exports = app;
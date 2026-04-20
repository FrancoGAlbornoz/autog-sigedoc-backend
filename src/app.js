const express = require('express');
const cors = require('cors');

// Repositorios y casos de uso para Pisos
const pool = require('./infrastructure/storage/db/postgres');
const PostgresPisoRepository = require('./infrastructure/adapters/repositories/postgres-piso.repository');
const GetPisosUseCase = require('./application/use-cases/get-pisos.use-case');
const PisoController = require('./presentation/controllers/piso.controller');
const createPisoRouter = require('./presentation/routes/piso.routes');

// Repositorios y casos de uso para Oficinas

const PostgresOficinaRepository = require('./infrastructure/adapters/repositories/postgres-oficina.repository')
const GetOficinasUseCase = require('./application/use-cases/get-oficinas.use-case')
const OficinaController = require('./presentation/controllers/oficina.controller')
const createOficinaRouter = require('./presentation/routes/oficina.routes')

// Repositorios y casos de uso para sistemas externos

const PostgresSistemaExternoRepository = require('./infrastructure/adapters/repositories/postgres-sistema-externo.repository')
const GetSistemasExternosUseCase = require('./application/use-cases/get-sistema-externo.use-case')
const SistemaExternoController = require('./presentation/controllers/sistema-externo.controller')
const createSistemaExternoRouter = require('./presentation/routes/sistema-externo.routes')

// Repositorios y casos de uso para Tipo de Tramites.
const PostgresTipoTramiteRepository = require("./infrastructure/adapters/repositories/postgres-tipo-tramite.repository")
const GetTipoTramitesUseCase = require ('./application/use-cases/get-tipos-tramite.use-case')
const TipoTramiteController = require('./presentation/controllers/tipo-tramite.controller')
const createTipoTramiteRouter = require('./presentation/routes/tipo-tramite.routes')

// Repositorios y casos de uso para Tramites.
const PostgresTramiteRepository = require("./infrastructure/adapters/repositories/postgres-tramite.repository")



const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para verificar que el servidor está vivo
app.get('/health', (_req, res) => res.json({ status: 'ok' }));


// Configuración de rutas para Pisos
const pisoRepository = new PostgresPisoRepository(pool);
const getPisosUseCase = new GetPisosUseCase(pisoRepository);
const pisoController = new PisoController(getPisosUseCase);

app.use('/api/pisos', createPisoRouter(pisoController));

// Configuración de rutas para Oficinas
const oficinaRepository = new PostgresOficinaRepository(pool);
const getOficinasUseCase = new GetOficinasUseCase(oficinaRepository);
const oficinaController = new OficinaController(getOficinasUseCase);

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



module.exports = app;
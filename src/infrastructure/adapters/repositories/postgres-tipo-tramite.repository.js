const TipoTramiteRepository = require('../../../application/ports/tipo-tramite.repository')
const TipoTramite = require('../../../domain/entity/tipo-tramite.entity')

class PostgresTipoTramiteRepository extends TipoTramiteRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll() {
    const query = `
      SELECT id_tipo_tramite, nombre_tramite
      FROM "TipoDeTramite"
      ORDER BY nombre_tramite ASC
    `;

    const result = await this.db.query(query);

    return result.rows.map((row) =>
      new TipoTramite({
        id: row.id_tipo_tramite,
        nombre: row.nombre_tramite,
      })
    );
  }
}

module.exports = PostgresTipoTramiteRepository;
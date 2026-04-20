const PisoRepository = require('../../../application/ports/piso.repository');
const Piso = require('../../../domain/entity/piso.entity');

class PostgresPisoRepository extends PisoRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll() {
    const query = `
      SELECT id_piso, nombre_piso
      FROM "Piso"
      ORDER BY nombre_piso ASC
    `;

    const result = await this.db.query(query);

    return result.rows.map((row) =>
      new Piso({
        id: row.id_piso,
        nombre: row.nombre_piso,
      })
    );
  }
}

module.exports = PostgresPisoRepository;
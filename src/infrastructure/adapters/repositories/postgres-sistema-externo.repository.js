const SistemaExternoRepository = require('../../../application/ports/sistema-externo.repository');
const SistemaExterno = require('../../../domain/entity/sistema-externo.entity');

class PostgresSistemaExternoRepository extends SistemaExternoRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll() {
    const query = `
      SELECT id_sistema, nombre_sistema
      FROM "SistemaExterno"
      ORDER BY nombre_sistema ASC
    `;

    const result = await this.db.query(query);

    return result.rows.map((row) =>
      new SistemaExterno({
        id: row.id_sistema,
        nombre: row.nombre_sistema,
      })
    );
  }
}

module.exports = PostgresSistemaExternoRepository;
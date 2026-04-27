const OficinaRepository = require('../../../application/ports/oficina.repository');
const Oficina = require('../../../domain/entity/oficina.entity');

class PostgresOficinaRepository extends OficinaRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll() {
    const query = `
      SELECT id_oficina, nombre_oficina, id_piso
      FROM "Oficina"
      ORDER BY nombre_oficina ASC
    `;

    const result = await this.db.query(query);

    return result.rows.map((row) =>
      new Oficina({
        id: row.id_oficina,
        nombre: row.nombre_oficina,
        id_piso: row.id_piso,
      })
    );
  }

  async findByPiso(idPiso) {
  const query = `
    SELECT id_oficina, nombre_oficina, id_piso
    FROM "Oficina"
    WHERE id_piso = $1
    ORDER BY nombre_oficina ASC
  `;

  const result = await this.db.query(query, [idPiso]);

  return result.rows.map((row) =>
    new Oficina({
      id: row.id_oficina,
      nombre: row.nombre_oficina,
      id_piso: row.id_piso,
    })
  );
}
}

module.exports = PostgresOficinaRepository;
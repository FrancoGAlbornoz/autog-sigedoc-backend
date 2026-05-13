const TramiteRepository = require('../../../application/ports/tramite.repository');
const Tramite = require('../../../domain/entity/tramite.entity');
const Detalle = require('../../../domain/entity/detalle.entity');

class PostgresTramiteRepository extends TramiteRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async create(tramite, detalles) {
    // Usamos un cliente para poder hacer la transacción
    const client = await this.db.connect();

    try {
      // Iniciamos la transacción
      await client.query('BEGIN');

      // 1. Insertar el trámite
      const tramiteQuery = `
        INSERT INTO "Tramite" (
          id_oficina, id_sistema, id_tipo_tramite,
          apellido_encargado, nombre_encargado,
          cargo, telefono, email, estado
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

      const tramiteValues = [
        tramite.id_oficina,
        tramite.id_sistema,
        tramite.id_tipo_tramite,
        tramite.apellido_encargado,
        tramite.nombre_encargado,
        tramite.cargo,
        tramite.telefono,
        tramite.email,
        'En proceso',
      ];

      const tramiteResult = await client.query(tramiteQuery, tramiteValues);
      const tramiteCreado = new Tramite(tramiteResult.rows[0]);

      // 2. Insertar cada detalle
      const detallesCreados = [];

      for (const detalle of detalles) {
        const detalleQuery = `
          INSERT INTO "Detalle" (
            id_tramite, apellido, nombres, cuil,
            mail, telefono, id_oficina, perfil, condicion, usuario_sigedoc
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `;

        const detalleValues = [
          tramiteCreado.id_tramite,
          detalle.apellido,
          detalle.nombres,
          detalle.cuil,
          detalle.mail,
          detalle.telefono || null,
          detalle.id_oficina,
          detalle.perfil || null,
          detalle.condicion || null,
          detalle.usuario_sigedoc || null,
        ];

        const detalleResult = await client.query(detalleQuery, detalleValues);
        detallesCreados.push(new Detalle(detalleResult.rows[0]));
      }

      // 3. Todo salió bien, confirmamos la transacción
      await client.query('COMMIT');

      return {
        tramite: tramiteCreado,
        detalles: detallesCreados,
      };

    } catch (error) {
      // Algo falló, revertimos todo
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Siempre liberamos el cliente
      client.release();
    }
  }

  async findAll() {
    const query = `
      SELECT * FROM "Tramite"
      ORDER BY id_tramite DESC
    `;
    const result = await this.db.query(query);
    return result.rows.map((row) => new Tramite(row));
  }

  async findById(id) {
    const tramiteQuery = `
    SELECT t.*, o.nombre_oficina
    FROM "Tramite" t
    JOIN "Oficina" o ON t.id_oficina = o.id_oficina
    WHERE t.id_tramite = $1
  `;
    const detalleQuery = `
    SELECT d.*, o.nombre_oficina
    FROM "Detalle" d
    JOIN "Oficina" o ON d.id_oficina = o.id_oficina
    WHERE d.id_tramite = $1
  `;

    const [tramiteResult, detalleResult] = await Promise.all([
      this.db.query(tramiteQuery, [id]),
      this.db.query(detalleQuery, [id]),
    ]);

    if (tramiteResult.rows.length === 0) return null;

    return {
      tramite: new Tramite(tramiteResult.rows[0]),
      detalles: detalleResult.rows.map((row) => new Detalle(row)),
      nombreOficina: tramiteResult.rows[0].nombre_oficina,
    };
  }

  async updateEstado(id, estado) {
    const query = `
      UPDATE "Tramite" SET estado = $1
      WHERE id_tramite = $2
      RETURNING *
    `;
    const result = await this.db.query(query, [estado, id]);
    return new Tramite(result.rows[0]);
  }

  async updateEstadoYUrl(id, estado, url) {
    const query = `
    UPDATE "Tramite" 
    SET estado = $1, url_pdf = $2
    WHERE id_tramite = $3
    RETURNING *
  `;
    const result = await this.db.query(query, [estado, url, id]);
    return new Tramite(result.rows[0]);
  }

  async findByEstado(estado) {
    const query = `
    SELECT * FROM "Tramite"
    WHERE estado = $1
    ORDER BY id_tramite DESC
  `;
    const result = await this.db.query(query, [estado])
    return result.rows.map((row) => new Tramite(row));
  }

}

module.exports = PostgresTramiteRepository;
const TramiteRepository = require("../../../domain/repositories/tramite.repository")
const Tramite = require("../../../domain/entities/tramite.entity")
const Detalle = require("../../../domain/entities/detalle.entity")

class PostgresTramiteRepository extends TramiteRepository{
    constructor(db){
    super()
    this.db =db
    }

    async create(tramite, detalles){
        const client = await this.db.connect()
        try {
            await client.query('BEGIN')
            //inserto tramite
            const tramiteQuery = `
                INSERT INTO "Tramite" (id_oficina, id_sistema, id_tipo_tramite, apellido_encargado, nombre_encargado, nombre_jefe, cargo, telefono, email, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING*;`

            const tramiteValues = [tramite.id_oficina, tramite.id_sistema, tramite.id_tipo_tramite, tramite.apellido_encargado, tramite.nombre_encargado, tramite.nombre_jefe, tramite.cargo, tramite.telefono, tramite.email, 'En proceso']
            
            const tramiteResult = await client.query(tramiteQuery, tramiteValues)
            const tramiteCreado = new Tramite (tramiteResult.rows[0])
        


            const detallesCreados = []

            for (const detalle of detalles){
                const detalleQuery = `
                INSERT INTO "Detalle" (id_tramite, apellido, nombres, cuil, mail, telefono, id_oficina. perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*;
                `
                const detalleValues = [tramiteCreado.id, detalle.apellido, detalle.nombres, detalle.cuil, detalle.mail, detalle.telefono || null, detalle.id_oficina, detalle.perfil || null]

                const detalleResult = await client.query(detalleQuery, detalleValues)
                detallesCreados.push(new Detalle(detalleResult.rows[0]))
                
                await client.query('COMMIT')
                
                return{
                    tramite: tramiteCreado,
                    detalles: detallesCreados
                }
            }

        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }

    async findAll(){
        const query = `SELECT * FROM "Tramite" ORDER BY id_tramite DESC`
        const result = await this.db.query(query)
        return result.rows.map((row) => new Tramite(row))
    }

    async findById(id){
        const query = `SELECT * FROM "Tramite" WHERE id_tramite = $1`
        const detalleQuery = `SELECT * FROM "Detalle" WHERE id_tramite = $1`
        const [tramiteResult, detalleResult] = await Promise.all([
            this.db.query(query, [id]),
            this.db.query(detalleQuery, [id])
        ])
        if (tramiteResult.rows.length === 0)return null

        return {
            tramite: new Tramite(tramiteResult.rows[0]),
            detalles: detalleResult.rows.map((row) => new Detalle(row))
        }
    }

    async updateEstado (id,estado){
        const query = `UPDATE "Tramite" SET estado = $1 WHERE id_tramite = $2 RETURNING *`
        const result = await this.db.query(query, [estado, id])
        return new Tramite(result.rows[0])
    }         
    
}

module.exports = PostgresTramiteRepository
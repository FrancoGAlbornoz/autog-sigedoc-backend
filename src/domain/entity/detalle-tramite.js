class DetalleTramite {
    constructor({
        id_detalle,
        id_tramite,
        apellido,
        nombres,
        cuil,
        mail,
        telefono,
        id_oficina,
        perfil
    }) {
        this.id_detalle = id_detalle;
        this.id_tramite = id_tramite;
        this.apellido = apellido;
        this.nombres = nombres;
        this.cuil = cuil;
        this.mail = mail;
        this.telefono = telefono;
        this.id_oficina = id_oficina;
        this.perfil = perfil;
    }
}
module.exports = DetalleTramite
class Tramite {
    constructor({
        id_tramite,
        id_oficina,
        id_sistema,
        id_tipo_tramite,
        apellido_encargado,
        nombre_encargado,
        cargo,
        url_pdf,
        telefono,
        email,
        estado
    }) {
        this.id_tramite = id_tramite;
        this.id_oficina = id_oficina;
        this.id_sistema = id_sistema;
        this.id_tipo_tramite = id_tipo_tramite;
        this.apellido_encargado = apellido_encargado;
        this.nombre_encargado = nombre_encargado;
        this.cargo = cargo;
        this.url_pdf = url_pdf;
        this.telefono = telefono;
        this.email = email;
        this.estado = estado;
    }


}
module.exports = Tramite
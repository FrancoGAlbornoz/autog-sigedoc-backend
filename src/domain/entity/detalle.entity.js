class Detalle {
  constructor({
    id,
    id_tramite,
    apellido,
    nombres,
    cuil,
    mail,
    telefono,
    id_oficina,
    perfil,
  }) {
    this.id = id;
    this.id_tramite = id_tramite;
    this.apellido = apellido;
    this.nombres = nombres;
    this.cuil = cuil;
    this.mail = mail;
    this.telefono = telefono || null;
    this.id_oficina = id_oficina;
    this.perfil = perfil || null;
  }
}

module.exports = Detalle;
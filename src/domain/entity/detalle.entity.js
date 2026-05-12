const Email = require('../value-objects/Email');
const Cuil = require('../value-objects/Cuil');

class Detalle {
  constructor({
    id_detalle,
    id_tramite,
    apellido,
    nombres,
    cuil,
    mail,
    telefono,
    id_oficina,
    nombre_oficina,  // ← agregá este
    perfil,
    condicion,
  }) {
    this.id_detalle = id_detalle;
    this.id_tramite = id_tramite;
    this.apellido = apellido;
    this.nombres = nombres;
    this.cuil = new Cuil(cuil).toString();
    this.mail = new Email(mail).toString();
    this.telefono = telefono || null;
    this.id_oficina = id_oficina;
    this.nombre_oficina = nombre_oficina || null;  // ← y este
    this.perfil = perfil || null;
    this.condicion = condicion || null;
  }
}

module.exports = Detalle;
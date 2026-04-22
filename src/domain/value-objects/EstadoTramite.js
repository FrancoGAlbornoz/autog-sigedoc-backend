
const ESTADOS_VALIDOS = ['En proceso', 'Enviado', 'Completado', 'No completado'];

class EstadoTramite {
  constructor(valor) {
    if (!ESTADOS_VALIDOS.includes(valor)) {
      throw new Error(`Estado inválido: "${valor}". Los estados válidos son: ${ESTADOS_VALIDOS.join(', ')}`);
    }
    this.valor = valor;
  }

  static EN_PROCESO = 'En proceso';
  static ENVIADO = 'Enviado';
  static COMPLETADO = 'Completado';
  static NO_COMPLETADO = 'No completado';

  toString() {
    return this.valor;
  }
}

module.exports = EstadoTramite;

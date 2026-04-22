class Cuil {
  constructor(valor) {
    if (!valor || typeof valor !== 'string') {
      throw new Error('El CUIL es requerido');
    }

    // Acepta formato 20-12345678-9 o 20123456789
    const cuilLimpio = valor.replace(/-/g, '');

    if (!/^\d{11}$/.test(cuilLimpio)) {
      throw new Error(`CUIL inválido: "${valor}". Formato esperado: 20-12345678-9`);
    }

    this.valor = valor.trim();
  }

  toString() {
    return this.valor;
  }
}

module.exports = Cuil;
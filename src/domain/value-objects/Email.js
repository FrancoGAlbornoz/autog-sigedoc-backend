class Email {
  constructor(valor) {
    if (!valor || typeof valor !== 'string') {
      throw new Error('El email es requerido');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) {
      throw new Error(`Email inválido: "${valor}"`);
    }

    this.valor = valor.toLowerCase().trim();
  }

  toString() {
    return this.valor;
  }
}

module.exports = Email;
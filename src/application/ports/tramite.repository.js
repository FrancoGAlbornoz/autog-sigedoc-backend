class TramiteRepository {
  async create(tramite, detalles) {
    throw new Error('Método create() no implementado');
  }

  async findAll() {
    throw new Error('Método findAll() no implementado');
  }

  async findById(id) {
    throw new Error('Método findById() no implementado');
  }

  async updateEstado(id, estado) {
    throw new Error('Método updateEstado() no implementado');
  }

  async updateEstadoYUrl(id, estado, url) {
    throw new Error('Método updateEstadoYUrl() no implementado');
  }


  async findByEstado(estado) {
    throw new Error('Método findByEstado() no implementado');
  }

}

module.exports = TramiteRepository;
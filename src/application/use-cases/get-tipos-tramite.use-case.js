class GetTiposTramiteUseCase {
  constructor(tipoTramiteRepository) {
    this.tipoTramiteRepository = tipoTramiteRepository;
  }

  async execute() {
    return await this.tipoTramiteRepository.findAll();
  }
}

module.exports = GetTiposTramiteUseCase;
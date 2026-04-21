class GetAllTramitesUseCase {
  constructor(tramiteRepository) {
    this.tramiteRepository = tramiteRepository
  }

  async execute() {
    const tramites = await this.tramiteRepository.findAll()
    return tramites
  }
}

module.exports = GetAllTramitesUseCase;
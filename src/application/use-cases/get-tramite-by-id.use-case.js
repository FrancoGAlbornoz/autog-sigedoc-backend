class GetTipoTramitesUseCase {
    constructor(tramiteRepository) {
        this.tramiteRepository = tramiteRepository
    }

    async execute(id) {
        const tramite = await this.tramiteRepository.findById(id)
        return tramite
    }
}

module.exports = GetTipoTramitesUseCase;
class GetTramitesByEstadoUseCase {
    constructor(tramiteRepository) {
        this.tramiteRepository = tramiteRepository;
    }

    async execute(estado) {
        return await this.tramiteRepository.findByEstado(estado);
    }
}

module.exports = GetTramitesByEstadoUseCase;
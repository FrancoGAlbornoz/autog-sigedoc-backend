class CreateTramiteUseCase{
    constructor(tramiteRepository){
        this.tramiteRepository = tramiteRepository
    }
    async excute({tramite,detalles}){
        if(!detalles || detalles.length === 0){
            throw new Error("Debe existir al menos un usuario/solicitante de tramite.")
        }
        const resultado = await this.tramiteRepository.create(tramite,detalles)
        return resultado
    }
    
}

module.exports = CreateTramiteUseCase


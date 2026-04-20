class TramiteController{
    constructor(createTramiteUseCase){
        this.createTramiteUseCase = createTramiteUseCase
    }
    async create(req,res){
        try {
            const {detalles, ...tramiteData} = req.body

            if(!tramiteData.id_oficina || !tramiteData.id_sistema || !tramiteData.id_tipo_tramite ){
                return res.status(400).json({ok: false, message: "Faltan datos obligatorios"})
            }
            if (!detalles || !Array.isArray(detalles) || detalles.length === 0){
                return res.status(400).json({ok: false, message: "Debe existir al menos un usuario/solicitante de tramite."})
            }

            const resultado = await this.createTramiteUseCase.excute({tramite: tramiteData, detalles})

            return res.status(201).json({ok: true, data: resultado})

            
        } catch (error) {
            console.error("Error al crear el tramite", error)
            return res.status(500).json({ok: false, message: "Error interno del servidor"})
        }
    }
}

module.exports = TramiteController
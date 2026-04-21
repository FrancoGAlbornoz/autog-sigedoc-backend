class TramiteController {
    constructor(createTramiteUseCase, getAllTramitesUseCase, getTramiteByIdUseCase) {
        this.createTramiteUseCase = createTramiteUseCase
        this.getAllTramitesUseCase = getAllTramitesUseCase
        this.getTramiteByIdUseCase = getTramiteByIdUseCase
    }

    create = async (req, res) => {
        try {
            const { detalles, ...tramiteData } = req.body

            if (!tramiteData.id_oficina || !tramiteData.id_sistema || !tramiteData.id_tipo_tramite) {
                return res.status(400).json({ ok: false, message: "Faltan datos obligatorios" })
            }
            if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
                return res.status(400).json({ ok: false, message: "Debe existir al menos un usuario/solicitante de tramite." })
            }

            const resultado = await this.createTramiteUseCase.execute({ tramite: tramiteData, detalles })

            return res.status(201).json({ ok: true, data: resultado })


        } catch (error) {
            console.error("Error al crear el tramite", error)
            return res.status(500).json({ ok: false, message: "Error interno del servidor" })
        }
    }

    getAll = async (req, res) => {
        try {
            const tramites = await this.getAllTramitesUseCase.execute()
            return res.status(200).json({ ok: true, data: tramites })
        } catch (error) {
            console.error("Error al obtener los tramites", error)
            return res.status(500).json({ ok: false, message: "Error interno del servidor" })
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params
            const resultado = await this.getTramiteByIdUseCase.execute(id)
            if (!resultado) {
                return res.status(404).json({ ok: false, message: "Tramite no encontrado" })
            }
            return res.status(200).json({ ok: true, data: resultado })
        } catch (error) {
            console.error("Error al obtener el tramite", error)
            return res.status(500).json({ ok: false, message: "Error interno del servidor" })
        }
    }

}

module.exports = TramiteController
class OficinaController{
    constructor(getOficinasUseCase){
        this.getOficinasUseCase = getOficinasUseCase;
    }

    getAll = async (_req, res) => {
        try {
            const oficinas = await this.getOficinasUseCase.execute();
            return res.status(200).json({
                ok: true,
                data: oficinas
            });
        } catch (error) {
            console.error('❌ Error al obtener oficinas:', error);
            return res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
        }   
    }
}

module.exports = OficinaController;


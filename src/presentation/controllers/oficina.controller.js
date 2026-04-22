class OficinaController{
    constructor(getOficinasUseCase){
        this.getOficinasUseCase = getOficinasUseCase;
    }

    getAll = async (_req, res, next) => {
        try {
            const oficinas = await this.getOficinasUseCase.execute();
            return res.status(200).json({
                ok: true,
                data: oficinas
            });
        } catch (error) {
            next(error);
            console.error("Error al obtener las oficinas", error);
        }   
    }
}

module.exports = OficinaController;


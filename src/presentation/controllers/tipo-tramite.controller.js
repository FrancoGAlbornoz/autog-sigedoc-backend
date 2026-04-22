class TipoTramiteController {
  constructor(getTiposTramiteUseCase) {
    this.getTiposTramiteUseCase = getTiposTramiteUseCase;
  }

  getAll = async (_req, res, next) => {
    try {
      const tipos = await this.getTiposTramiteUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: tipos,
      });
    } catch (error) {
      next(error);
      console.error("Error al obtener los tipos de tramite", error);
    }
  };
}

module.exports = TipoTramiteController;
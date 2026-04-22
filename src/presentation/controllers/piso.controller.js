class PisoController {
  constructor(getPisosUseCase) {
    this.getPisosUseCase = getPisosUseCase;
  }

  getAll = async (_req, res, next) => {
    try {
      const pisos = await this.getPisosUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: pisos,
      });
    } catch (error) {
      next(error);
      console.error("Error al obtener los pisos", error);
    }
  };
}

module.exports = PisoController;
class SistemaExternoController {
  constructor(getSistemasExternosUseCase) {
    this.getSistemasExternosUseCase = getSistemasExternosUseCase;
  }

  getAll = async (_req, res, next) => {
    try {
      const sistemas = await this.getSistemasExternosUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: sistemas,
      });
    } catch (error) {
      next(error);
      console.error("Error al obtener los sistemas externos", error);
    }
  };
}

module.exports = SistemaExternoController;
class SistemaExternoController {
  constructor(getSistemasExternosUseCase) {
    this.getSistemasExternosUseCase = getSistemasExternosUseCase;
  }

  getAll = async (_req, res) => {
    try {
      const sistemas = await this.getSistemasExternosUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: sistemas,
      });
    } catch (error) {
      console.error('❌ Error al obtener sistemas externos:', error);

      return res.status(500).json({
        ok: false,
        message: 'Error interno del servidor',
      });
    }
  };
}

module.exports = SistemaExternoController;
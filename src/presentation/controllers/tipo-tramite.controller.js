class TipoTramiteController {
  constructor(getTiposTramiteUseCase) {
    this.getTiposTramiteUseCase = getTiposTramiteUseCase;
  }

  getAll = async (_req, res) => {
    try {
      const tipos = await this.getTiposTramiteUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: tipos,
      });
    } catch (error) {
      console.error('❌ Error al obtener tipos de trámite:', error);

      return res.status(500).json({
        ok: false,
        message: 'Error interno del servidor',
      });
    }
  };
}

module.exports = TipoTramiteController;
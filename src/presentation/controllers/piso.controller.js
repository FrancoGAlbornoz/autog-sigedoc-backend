class PisoController {
  constructor(getPisosUseCase) {
    this.getPisosUseCase = getPisosUseCase;
  }

  getAll = async (_req, res) => {
    try {
      const pisos = await this.getPisosUseCase.execute();

      return res.status(200).json({
        ok: true,
        data: pisos,
      });
    } catch (error) {
      console.error('❌ Error al obtener pisos:', error);

      return res.status(500).json({
        ok: false,
        message: 'Error interno del servidor',
      });
    }
  };
}

module.exports = PisoController;
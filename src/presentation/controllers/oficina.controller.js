class OficinaController {
  constructor(getOficinasUseCase, getOficinasByPisoUseCase) {
    this.getOficinasUseCase = getOficinasUseCase;
    this.getOficinasByPisoUseCase = getOficinasByPisoUseCase;
  }

  getAll = async (_req, res, next) => {
    try {
      const oficinas = await this.getOficinasUseCase.execute();
      return res.status(200).json({ ok: true, data: oficinas });
    } catch (error) {
      next(error);
    }
  }

  getByPiso = async (req, res, next) => {
    try {
      const { idPiso } = req.params;
      const oficinas = await this.getOficinasByPisoUseCase.execute(idPiso);
      return res.status(200).json({ ok: true, data: oficinas });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OficinaController;
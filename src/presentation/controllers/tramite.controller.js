class TramiteController {
  constructor(
    createTramiteUseCase,
    getAllTramitesUseCase,
    getTramiteByIdUseCase,
    generarPdfUseCase,
  ) {
    this.createTramiteUseCase = createTramiteUseCase;
    this.getAllTramitesUseCase = getAllTramitesUseCase;
    this.getTramiteByIdUseCase = getTramiteByIdUseCase;
    this.generarPdfUseCase = generarPdfUseCase;
  }

  create = async (req, res, next) => {
    try {
      const { detalles, ...tramiteData } = req.body;

      if (
        !tramiteData.id_oficina ||
        !tramiteData.id_sistema ||
        !tramiteData.id_tipo_tramite
      ) {
        return res
          .status(400)
          .json({ ok: false, message: "Faltan datos obligatorios" });
      }
      if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
        return res
          .status(400)
          .json({
            ok: false,
            message: "Debe existir al menos un usuario/solicitante de tramite.",
          });
      }

      const resultado = await this.createTramiteUseCase.execute({
        tramite: tramiteData,
        detalles,
      });

      return res.status(201).json({ ok: true, data: resultado });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const tramites = await this.getAllTramitesUseCase.execute();
      return res.status(200).json({ ok: true, data: tramites });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const resultado = await this.getTramiteByIdUseCase.execute(id);
      if (!resultado) {
        return res
          .status(404)
          .json({ ok: false, message: "Tramite no encontrado" });
      }
      return res.status(200).json({ ok: true, data: resultado });
    } catch (error) {
      next(error);
    }
  };

  generarPdf = async (req, res, next) => {
    try {
      const { id } = req.params;
      const pdfBuffer = await this.generarPdfUseCase.execute(id);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="solicitud-${id}.pdf"`,
      );
      return res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TramiteController;

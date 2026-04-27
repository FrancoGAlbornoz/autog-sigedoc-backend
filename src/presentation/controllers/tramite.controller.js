class TramiteController {
  constructor(
    createTramiteUseCase,
    getAllTramitesUseCase,
    getTramiteByIdUseCase,
    generarPdfUseCase,
    subirDocumentoFirmadoUseCase,
    getTramitesByEstadoUseCase,
  ) {
    this.createTramiteUseCase = createTramiteUseCase;
    this.getAllTramitesUseCase = getAllTramitesUseCase;
    this.getTramiteByIdUseCase = getTramiteByIdUseCase;
    this.generarPdfUseCase = generarPdfUseCase;
    this.subirDocumentoFirmadoUseCase = subirDocumentoFirmadoUseCase;
    this.getTramitesByEstadoUseCase = getTramitesByEstadoUseCase;
  }

  create = async (req, res, next) => {
    try {
      const { detalles, ...tramiteData } = req.body;
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
      const { estado } = req.query;

      let tramites;
      if (estado) {
        tramites = await this.getTramitesByEstadoUseCase.execute(estado); // ← este
      } else {
        tramites = await this.getAllTramitesUseCase.execute();
      }
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
      const docBuffer = await this.generarPdfUseCase.execute(id);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="solicitud-${id}.docx"`);
      return res.send(docBuffer);
    } catch (error) {
      next(error);
    }
  }

  subirDocumentoFirmado = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          ok: false,
          message: "Debe adjuntar un archivo",
        });
      }

      const resultado = await this.subirDocumentoFirmadoUseCase.execute({
        tramiteId: id,
        fileBuffer: req.file.buffer,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
      });

      return res.status(200).json({
        ok: true,
        message: "Documento firmado subido correctamente",
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TramiteController;

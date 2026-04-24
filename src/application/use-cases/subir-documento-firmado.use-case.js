const EstadoTramite = require('../../domain/value-objects/EstadoTramite');

class SubirDocumentoFirmadoUseCase {
  constructor(tramiteRepository, firebaseStorageService) {
    this.tramiteRepository = tramiteRepository;
    this.firebaseStorageService = firebaseStorageService;
  }

  async execute({ tramiteId, fileBuffer, fileName, mimeType }) {
    // Verificar que el trámite existe
    const resultado = await this.tramiteRepository.findById(tramiteId);
    if (!resultado) {
      throw new Error(`Trámite con id ${tramiteId} no encontrado`);
    }

    // Subir el archivo a Firebase Storage
    const destino = `tramites/${tramiteId}/${fileName}`;
    const url = await this.firebaseStorageService.subirArchivo(
      fileBuffer,
      destino,
      mimeType
    );

    // Actualizar estado y url_pdf en la DB
    await this.tramiteRepository.updateEstadoYUrl(
      tramiteId,
      EstadoTramite.ENVIADO,
      url
    );

    return { url, estado: EstadoTramite.ENVIADO };
  }
}

module.exports = SubirDocumentoFirmadoUseCase;
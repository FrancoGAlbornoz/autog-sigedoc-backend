const EstadoTramite = require('../../domain/value-objects/EstadoTramite');

class SubirDocumentoFirmadoUseCase {
  constructor(tramiteRepository, firebaseStorageService, enviarNotificacionEmailUseCase) {
    this.tramiteRepository = tramiteRepository;
    this.firebaseStorageService = firebaseStorageService;
    this.enviarNotificacionEmailUseCase = enviarNotificacionEmailUseCase;
  }

  async execute({ tramiteId, fileBuffer, fileName, mimeType }) {
    const resultado = await this.tramiteRepository.findById(tramiteId);
    if (!resultado) {
      throw new Error(`Trámite con id ${tramiteId} no encontrado`);
    }

    const destino = `tramites/${tramiteId}/${fileName}`;
    const url = await this.firebaseStorageService.subirArchivo(
      fileBuffer,
      destino,
      mimeType
    );

    await this.tramiteRepository.updateEstadoYUrl(
      tramiteId,
      EstadoTramite.ENVIADO,
      url
    );

    // IMPORTANTE: Ahora pasamos el buffer y el nombre para que lleguen al mail
    this.enviarNotificacionEmailUseCase.execute(tramiteId, fileBuffer, fileName).catch((err) => {
      console.error(`[Email] Error al enviar notificación:`, err.message);
    });

    return { url, estado: EstadoTramite.ENVIADO };
  }
}

module.exports = SubirDocumentoFirmadoUseCase;
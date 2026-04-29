// src/application/use-cases/enviar-notificacion-email.use-case.js
class EnviarNotificacionEmailUseCase {
  constructor(tramiteRepository, emailService) {
    this.tramiteRepository = tramiteRepository;
    this.emailService = emailService;
  }

  async execute(tramiteId, archivoBuffer, fileName) {
    const resultado = await this.tramiteRepository.findById(tramiteId);
    if (!resultado) throw new Error(`Trámite no encontrado`);

    // Llama al adaptador de Resend con el archivo adjunto
    await this.emailService.enviarNotificacion(
      resultado.tramite, 
      resultado.detalles, 
      archivoBuffer, 
      fileName
    );
  }
}

module.exports = EnviarNotificacionEmailUseCase;
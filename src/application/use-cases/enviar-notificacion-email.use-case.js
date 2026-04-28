class EnviarNotificacionEmailUseCase {
  constructor(tramiteRepository, pdfGeneratorService, emailService) {
    this.tramiteRepository = tramiteRepository;
    this.pdfGeneratorService = pdfGeneratorService;
    this.emailService = emailService;
  }

  async execute(tramiteId) {
    // Buscar el trámite con sus detalles
    const resultado = await this.tramiteRepository.findById(tramiteId);
    if (!resultado) {
      throw new Error(`Trámite ${tramiteId} no encontrado`);
    }

    const { tramite, detalles, nombreOficina } = resultado;

    // Generar el documento
    const docBuffer = await this.pdfGeneratorService.generarNotaSolicitud(
      tramite,
      detalles,
      nombreOficina
    );

    // Enviar el email con el documento adjunto
    await this.emailService.enviarNotificacion(tramite, detalles, docBuffer);
  }
}

module.exports = EnviarNotificacionEmailUseCase;
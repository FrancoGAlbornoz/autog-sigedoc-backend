class GenerarPdfUseCase {
  constructor(tramiteRepository, pdfGeneratorService) {
    this.tramiteRepository = tramiteRepository;
    this.pdfGeneratorService = pdfGeneratorService;
  }

  async execute(tramiteId) {
    // Buscar el trámite con sus detalles
    const resultado = await this.tramiteRepository.findById(tramiteId);

    if (!resultado) {
      throw new Error(`Trámite con id ${tramiteId} no encontrado`);
    }

    const { tramite, detalles, nombreOficina } = resultado;

    // Generar el PDF
    const pdfBuffer = await this.pdfGeneratorService.generarNotaSolicitud(
      tramite,
      detalles,
      nombreOficina  // por ahora usamos el id, después traemos el nombre
    );

    return pdfBuffer;
  }
}

module.exports = GenerarPdfUseCase;

class CreateTramiteUseCase {
  constructor(tramiteRepository) {
    this.tramiteRepository = tramiteRepository;
  }

  async execute({ tramite, detalles }) {
    // Validar que venga al menos un detalle
    if (!detalles || detalles.length === 0) {
      throw new Error('Debe incluir al menos un solicitante en el trámite');
    }

    const detallesConOficina = detalles.map((detalle) => ({
    ...detalle,
    id_oficina: tramite.id_oficina,
  }));

    // Guardar en la DB y devolver el trámite creado con sus detalles
    const resultado = await this.tramiteRepository.create(tramite, detallesConOficina);
    return resultado;
  }
}


module.exports = CreateTramiteUseCase 
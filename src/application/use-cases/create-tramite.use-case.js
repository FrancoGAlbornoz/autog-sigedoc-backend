class CreateTramiteUseCase {
  constructor(tramiteRepository) {
    this.tramiteRepository = tramiteRepository;
  }

  async execute({ tramite, detalles }) {
    // 1. Validar agentes solo si es Alta (1) o Baja (2)
    if (tramite.id_tipo_tramite === 1 || tramite.id_tipo_tramite === 2) {
      if (!detalles || detalles.length === 0 || detalles.length > 5) {
        throw new Error('Debe incluir entre 1 y 5 solicitantes para este tipo de trámite.');
      }
    }

    // 2. Mapear los detalles (Si detalles viene vacío en Instalación, el map no hace nada y devuelve [])
    const detallesConOficina = (detalles || []).map((detalle) => ({
      ...detalle,
      id_oficina: tramite.id_oficina,
    }));

    // 3. Guardar en la DB y devolver el trámite creado con sus detalles
    const resultado = await this.tramiteRepository.create(tramite, detallesConOficina);
    return resultado;
  }
}

module.exports = CreateTramiteUseCase;
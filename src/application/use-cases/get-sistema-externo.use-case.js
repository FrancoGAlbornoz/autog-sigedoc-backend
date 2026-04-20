class GetSistemasExternosUseCase {
  constructor(sistemaExternoRepository) {
    this.sistemaExternoRepository = sistemaExternoRepository;
  }

  async execute() {
    return await this.sistemaExternoRepository.findAll();
  }
}

module.exports = GetSistemasExternosUseCase;
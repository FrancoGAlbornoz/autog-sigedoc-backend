class GetPisosUseCase {
  constructor(pisoRepository) {
    this.pisoRepository = pisoRepository;
  }

  async execute() {
    return await this.pisoRepository.findAll();
  }
}

module.exports = GetPisosUseCase;
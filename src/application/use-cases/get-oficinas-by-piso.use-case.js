class GetOficinasByPisoUseCase {
  constructor(oficinaRepository) {
    this.oficinaRepository = oficinaRepository;
  }

  async execute(idPiso) {
    return await this.oficinaRepository.findByPiso(idPiso);
  }
}

module.exports = GetOficinasByPisoUseCase;
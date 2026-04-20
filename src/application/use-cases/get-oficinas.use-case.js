class GetOficinasUseCase {
    constructor(oficinaRepository) {
        this.oficinaRepository = oficinaRepository;
    }
    async execute() {
        return await this.oficinaRepository.findAll();
    }   
}

module.exports = GetOficinasUseCase;
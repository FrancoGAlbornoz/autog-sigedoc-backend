class TramiteRepository{
    async create(tramite, detalle){
        throw error("Method 'create' must be implemented.");
    }
    async findAll(){
        throw error("Method must be implemented.");
    }
    async findById(id){
        throw error("Method must be implemented.");
    }
    async updateEstado(id, estado){
        throw error("Method must be implemented.");
    }
    
}

module.exports = TramiteRepository
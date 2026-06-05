const fs = require('fs/promises');
const path = require('path');

class FirebaseStorageService {
  /**
   * Guarda un archivo localmente y devuelve la URL HTTP pública
   * @param {Buffer} fileBuffer
   * @param {string} destino - ruta relativa ej: "tramites/1/firmado.pdf"
   * @param {string} mimeType
   * @returns {Promise<string>} URL pública para acceder al archivo
   */
  async subirArchivo(fileBuffer, destino, mimeType) {
    const basePath = process.env.LOCAL_STORAGE_PATH || '/home/sistema/storage/autogestion';
    const rutaFinal = path.join(basePath, destino);

    // Asegurar que el directorio exista
    await fs.mkdir(path.dirname(rutaFinal), { recursive: true });

    // Guardar el archivo en el sistema local
    await fs.writeFile(rutaFinal, fileBuffer);

    // Construir y devolver la URL HTTP
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const urlPublica = `${backendUrl}/storage/${destino}`;

    return urlPublica;
  }
}

module.exports = FirebaseStorageService;
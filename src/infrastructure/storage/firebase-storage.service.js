const { initializeApp, getApps } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

// Solo inicializa si no hay una app ya inicializada
if (getApps().length === 0) {
  initializeApp({
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// Apuntar al emulador en desarrollo
if (process.env.NODE_ENV === 'development') {
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_EMULATOR_HOST;
}

class FirebaseStorageService {
  /**
   * Sube un archivo al Storage y devuelve la URL pública
   * @param {Buffer} fileBuffer
   * @param {string} destino - ruta dentro del bucket ej: "tramites/1/firmado.pdf"
   * @param {string} mimeType
   * @returns {Promise<string>} URL del archivo
   */
  async subirArchivo(fileBuffer, destino, mimeType) {
    const bucket = getStorage().bucket();
    const archivo = bucket.file(destino);

    await archivo.save(fileBuffer, {
      metadata: { contentType: mimeType },
      public: true,
    });

    const url = `http://${process.env.FIREBASE_EMULATOR_HOST}/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(destino)}?alt=media`;
    return url;
  }
}

module.exports = FirebaseStorageService;
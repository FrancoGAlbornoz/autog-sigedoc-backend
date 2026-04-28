const path = require('path');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

class PdfGeneratorService {
  async generarNotaSolicitud(tramite, detalles, nombreOficina) {
    try {
      // Asegurate de que el nombre coincida EXACTO con el archivo en el disco
      const plantillaPath = path.join(__dirname, 'modelo_de_nota.docx');

      if (!fs.existsSync(plantillaPath)) {
        throw new Error(`No se encontró la plantilla en: ${plantillaPath}`);
      }

      const contenido = fs.readFileSync(plantillaPath, 'binary');
      const zip = new PizZip(contenido);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Tu lógica de fecha y render...
      const fechaActual = this._obtenerFechaFormateada();

      doc.render({
        fecha: fechaActual,
        apellido_encargado: tramite.apellido_encargado,
        nombre_encargado: tramite.nombre_encargado,
        cargo: tramite.cargo || '-',
        telefono: tramite.telefono || '-',
        email: tramite.email || '-',
        detalles: detalles.map((d) => ({
          apellido: d.apellido,
          nombres: d.nombres,
          cuil: d.cuil,
          mail: d.mail,
          telefono: d.telefono || '-',
          nombre_oficina: d.nombre_oficina || nombreOficina,
          perfil: d.perfil || '-',
        })),
      });

      return doc.getZip().generate({ type: 'nodebuffer' });
    } catch (error) {
      console.error("Error en PdfGeneratorService:", error);
      throw error;
    }
  }

  _obtenerFechaFormateada() {
    const d = new Date();
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    return `${d.getDate()} de ${meses[d.getMonth()]} del ${d.getFullYear()}`;
  }
}

module.exports = PdfGeneratorService;
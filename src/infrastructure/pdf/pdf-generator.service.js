const path = require('path');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

class PdfGeneratorService {
  async generarNotaSolicitud(tramite, detalles, nombreOficina) {
    try {
      // 1. Elegimos la plantilla dinámicamente según el id_tipo_tramite
      let nombreArchivoPlantilla = 'modelo_de_nota.docx'; // Alta (1) por defecto

      if (tramite.id_tipo_tramite === 2) {
        nombreArchivoPlantilla = 'modelo_baja.docx';
      } else if (tramite.id_tipo_tramite === 3) {
        nombreArchivoPlantilla = 'modelo_inst_certificados.docx';
      }

      // Asegurate de tener estos 3 archivos creados en la misma carpeta que este script
      const plantillaPath = path.join(__dirname, nombreArchivoPlantilla);

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
        nombre_oficina: nombreOficina,
        detalles: detalles.map((d) => ({
          apellido: d.apellido,
          nombres: d.nombres,
          cuil: d.cuil,
          mail: d.mail,
          telefono: d.telefono || '-',
          nombre_oficina: d.nombre_oficina || nombreOficina,
          perfil: d.perfil || '-',
          condicion: d.condicion || '-',
          usuario_sigedoc: d.usuario_sigedoc || '-', // <--- ESTA ES LA LÍNEA NUEVA PARA LA BAJA
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
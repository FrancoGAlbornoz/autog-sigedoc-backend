const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

class PdfGeneratorService {
  async generarNotaSolicitud(tramite, detalles, nombreOficina) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4

    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const margen = 60;
    let y = height - 60;

    // ── Helpers ───────────────────────────────────────────────
    const escribir = (texto, x, yPos, opts = {}) => {
      page.drawText(String(texto), {
        x,
        y: yPos,
        size: opts.size || 11,
        font: opts.bold ? fontBold : fontNormal,
        color: rgb(0, 0, 0),
      });
    };

    const fecha = () => {
      const d = new Date();
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `San Miguel de Tucumán, ${d.getDate()} de ${meses[d.getMonth()]} del ${d.getFullYear()}`;
    };

    // ── Fecha ─────────────────────────────────────────────────
    escribir(fecha(), margen, y, { bold: true });
    y -= 40;

    // ── Destinatario ──────────────────────────────────────────
    escribir('Secretaría de Estado de Gestión Pública y Planeamiento', margen, y, { bold: true });
    y -= 18;
    escribir('Dr. Mario Javier Morof', margen, y, { bold: true });
    y -= 18;
    escribir('S__ /__ D', margen, y, { bold: true });
    y -= 30;

    // ── Asunto ────────────────────────────────────────────────
    escribir('Asunto: Alta de Usuarios SiGeDoc', margen, y, { bold: true });
    y -= 30;

    // ── Cuerpo ────────────────────────────────────────────────
    const cuerpo = [
      'Me dirijo a usted a los efectos de solicitar la creación de un nuevo',
      `usuario del sistema Si.Ge.Doc. para la ${nombreOficina}.`,
      '',
      'Los datos del agente que desempeña tareas en la oficina a mi cargo se',
      'consignan a continuación:',
    ];

    for (const linea of cuerpo) {
      escribir(linea, margen, y);
      y -= 16;
    }
    y -= 10;

    // ── Tabla ─────────────────────────────────────────────────
    const columnas = [
      { header: 'Apellido', x: margen, ancho: 70 },
      { header: 'Nombres', x: margen + 70, ancho: 70 },
      { header: 'CUIL', x: margen + 140, ancho: 80 },
      { header: 'Mail', x: margen + 220, ancho: 105 },
      { header: 'Teléfono', x: margen + 325, ancho: 60 },
      { header: 'Oficina', x: margen + 385, ancho: 75 },
      { header: 'Perfil', x: margen + 460, ancho: 55 },
    ];

    const filaAltura = 20;

    // Fondo header de tabla
    page.drawRectangle({
      x: margen,
      y: y - filaAltura + 4,
      width: width - margen * 2,
      height: filaAltura,
      color: rgb(0.85, 0.85, 0.85),
    });

    // Headers
    for (const col of columnas) {
      escribir(col.header, col.x + 3, y, { bold: true, size: 9 });
    }
    y -= filaAltura;

    // Línea separadora
    page.drawLine({
      start: { x: margen, y },
      end: { x: width - margen, y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });

    // Filas de detalles
    for (const detalle of detalles) {
      const fila = [
        detalle.apellido,
        detalle.nombres,
        detalle.cuil,
        detalle.mail,
        detalle.telefono || '-',
        detalle.nombre_oficina || String(detalle.id_oficina),
        detalle.perfil || '-'
      ];

      for (let i = 0; i < columnas.length; i++) {
        escribir(fila[i], columnas[i].x + 3, y - 14, { size: 9 });
      }

      y -= filaAltura;

      // Línea entre filas
      page.drawLine({
        start: { x: margen, y },
        end: { x: width - margen, y },
        thickness: 0.3,
        color: rgb(0.7, 0.7, 0.7),
      });
    }

    y -= 20;

    // ── Cierre ────────────────────────────────────────────────
    const cierre = [
      'Se solicita la creación de usuarios nominales para el agente detallado,',
      'a fin de regularizar el acceso al sistema en el área de Administración.',
      'Lo que resulta indispensable generar estas altas para garantizar la',
      'correcta trazabilidad y seguridad en el manejo de los expedientes.',
      '',
      'Sin otro particular le saludo atentamente.',
    ];

    for (const linea of cierre) {
      escribir(linea, margen, y);
      y -= 16;
    }

    y -= 30;

    // ── Datos del responsable ─────────────────────────────────
    escribir('Datos de Contacto del Responsable', margen, y, { bold: true });
    y -= 18;
    escribir(`Apellido, Nombre: ${tramite.apellido_encargado}, ${tramite.nombre_encargado}`, margen, y);
    y -= 16;
    escribir(`Cargo: ${tramite.cargo || '-'}`, margen, y);
    y -= 16;
    escribir(`Teléfono: ${tramite.telefono || '-'}`, margen, y);
    y -= 16;
    escribir(`Mail: ${tramite.email || '-'}`, margen, y);

    // ── Borde exterior ────────────────────────────────────────
    page.drawRectangle({
      x: margen - 10,
      y: 40,
      width: width - (margen - 10) * 2,
      height: height - 80,
      borderColor: rgb(0, 0, 0),
      borderWidth: 0.5,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}

module.exports = PdfGeneratorService;
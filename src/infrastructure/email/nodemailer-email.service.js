// Archivo: infrastructure/email/nodemailer-email.service.js

const nodemailer = require('nodemailer');
const { generarTemplateHtml } = require('./templates/sigedoc-email.template'); // Importamos el template

class NodemailerEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM, // Mejor usar la variable de entorno acá también
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async enviarNotificacion(tramite, detalles, archivoBuffer, fileName) {
    try {
      let asunto = '';
      let textoPrincipal = '';

      // Configuramos el asunto y el texto según el tipo de trámite
      if (tramite.id_tipo_tramite === 1) { // ALTA
        asunto = `SOLICITUD ALTA SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `
          <p>Por medio del presente, se adjunta la nota de solicitud de <strong>alta de usuarios</strong> 
          en el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente, 
          para su procesamiento.</p>
          <p>Se solicita proceder con la habilitación de acceso conforme a los datos 
          consignados en el documento adjunto.</p>
        `;
      } else if (tramite.id_tipo_tramite === 2) { // BAJA
        asunto = `SOLICITUD BAJA SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `
          <p>Por medio del presente, se adjunta la nota de solicitud de <strong>baja de usuarios</strong> 
          en el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente, 
          para su procesamiento.</p>
          <p>Se solicita proceder con la inhabilitación de acceso conforme a los datos 
          consignados en el documento adjunto.</p>
        `;
      } else if (tramite.id_tipo_tramite === 3) { // INSTALACIÓN
        asunto = `SOLICITUD INSTALACIÓN CERTIFICADO SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `
          <p>Por medio del presente, se adjunta la nota de solicitud de <strong>instalación de certificado digital</strong> 
          para el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente.</p>
          <p>Se solicita proceder con la gestión técnica requerida para el área consignada en el documento adjunto.</p>
        `;
      } else { // Fallback
        asunto = `SOLICITUD SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `<p>Se adjunta documentación referida al trámite N° ${tramite.id_tramite} del sistema SiGeDoc.</p>`;
      }

      // Generamos el HTML usando la función importada
      const htmlBody = generarTemplateHtml(textoPrincipal);

      const mailOptions = {
        from: `"SUBSECRETARIA DE DESARROLLO PRODUCTIVO - AREA SISTEMAS" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_DESTINO,
        subject: asunto,
        html: htmlBody, // ¡Mirá qué limpito quedó esto!
        attachments: [
          {
            filename: fileName || `tramite_${tramite.id_tramite}_firmado.pdf`,
            content: archivoBuffer,
          },
        ],
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email enviado con éxito:', info.messageId);
      return info;
    } catch (err) {
      console.error('❌ Error en Nodemailer Service:', err);
      throw err; // El middleware de errores global de tu app.js atajará esto
    }
  }
}

module.exports = NodemailerEmailService;
const nodemailer = require('nodemailer');

class NodemailerEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
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
          Por medio del presente, se adjunta la nota de solicitud de <strong>alta de usuarios</strong> 
          en el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente, 
          para su procesamiento.<br><br>
          Se solicita proceder con la habilitación de acceso conforme a los datos 
          consignados en el documento adjunto.
        `;
      } else if (tramite.id_tipo_tramite === 2) { // BAJA
        asunto = `SOLICITUD BAJA SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `
          Por medio del presente, se adjunta la nota de solicitud de <strong>baja de usuarios</strong> 
          en el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente, 
          para su procesamiento.<br><br>
          Se solicita proceder con la inhabilitación de acceso conforme a los datos 
          consignados en el documento adjunto.
        `;
      } else if (tramite.id_tipo_tramite === 3) { // INSTALACIÓN
        asunto = `SOLICITUD INSTALACIÓN CERTIFICADO SIGEDOC - Trámite N° ${tramite.id_tramite}`;
        textoPrincipal = `
          Por medio del presente, se adjunta la nota de solicitud de <strong>instalación de certificado digital</strong> 
          para el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente.<br><br>
          Se solicita proceder con la gestión técnica requerida para el área consignada en el documento adjunto.
        `;
      } else {
        throw new Error('Tipo de trámite no reconocido');
      }

      const mailOptions = {
        from: `"SUBSECRETARIA DE DESARROLLO PRODUCTIVO - AREA SISTEMAS" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_DESTINO,
        subject: asunto,
        html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    
    <div style="background-color: #1a3a5c; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 18px; letter-spacing: 1px;">
        SUBSECRETARIA DE DESARROLLO PRODUCTIVO
      </h1>
      <p style="color: #a8c4e0; margin: 6px 0 0 0; font-size: 13px;">
        Sistema de Autogestión de Accesos — SiGeDoc
      </p>
    </div>

    <div style="padding: 32px 24px;">
      <p style="color: #333; font-size: 15px;">Estimado/a,</p>
      
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        ${textoPrincipal}
      </p>
      
      <p style="color: #333; font-size: 15px; margin-top: 24px;">
        Sin otro particular, saludo a usted atentamente.
      </p>
    </div>

    <div style="background-color: #f5f5f5; padding: 16px 24px; border-top: 1px solid #ddd; text-align: center;">
      <p style="color: #888; font-size: 12px; margin: 0;">
        Este correo fue generado automáticamente por el sistema de autogestión de accesos SiGeDoc.
      </p>
      <p style="color: #888; font-size: 12px; margin: 4px 0 0 0;">
        Por favor no responda este correo.
      </p>
    </div>

  </div>
`,
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
      throw err;
    }
  }
}

module.exports = NodemailerEmailService;
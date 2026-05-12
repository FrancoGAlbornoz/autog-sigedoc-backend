const nodemailer = require('nodemailer');

class NodemailerEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ticomputo0@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async enviarNotificacion(tramite, detalles, archivoBuffer, fileName) {
    try {
      const mailOptions = {
        from: `"SUBSECRETARIA DE DESARROLLO PRODUCTIVO - AREA SISTEMAS" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_DESTINO,
        subject: `SOLICITUD ALTA SIGEDOC - }`,
        html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #1a3a5c; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 18px; letter-spacing: 1px;">
        SUBSECRETARIA DE DESARROLLO PRODUCTIVO
      </h1>
      <p style="color: #a8c4e0; margin: 6px 0 0 0; font-size: 13px;">
        Sistema de Autogestión de Accesos — SiGeDoc
      </p>
    </div>

    <!-- Cuerpo -->
    <div style="padding: 32px 24px;">
      <p style="color: #333; font-size: 15px;">Estimado/a,</p>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        Por medio del presente, se adjunta la nota de solicitud de alta de usuarios 
        en el sistema <strong>SiGeDoc</strong>, debidamente firmada por la autoridad correspondiente, 
        para su procesamiento.
      </p>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        Se solicita proceder con la habilitación de acceso conforme a los datos 
        consignados en el documento adjunto.
      </p>
      <p style="color: #333; font-size: 15px; margin-top: 24px;">
        Sin otro particular, saludo a usted atentamente.
      </p>
    </div>

    <!-- Footer -->
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
            filename: fileName || 'nota_firmada.pdf',
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
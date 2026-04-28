const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SendGridEmailService {
  /**
   * Envía el correo de notificación con el documento adjunto
   * @param {object} tramite
   * @param {Buffer} docBuffer - el documento generado
   */
  async enviarNotificacion(tramite, detalles, docBuffer) {
    const tablaHtml = detalles.map((d) => `
      <tr>
        <td style="border:1px solid #ddd;padding:8px">${d.apellido}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.nombres}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.cuil}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.mail}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.telefono || '-'}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.nombre_oficina || '-'}</td>
        <td style="border:1px solid #ddd;padding:8px">${d.perfil || '-'}</td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 10px;">
          Nueva Solicitud de Acceso — SiGeDoc
        </h2>

        <p>Se ha completado una nueva solicitud de acceso al sistema.</p>

        <h3 style="color: #2c3e50;">Datos del Responsable</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px">
          <tr>
            <td style="padding:8px; font-weight:bold; width:200px">Apellido y Nombre:</td>
            <td style="padding:8px">${tramite.apellido_encargado}, ${tramite.nombre_encargado}</td>
          </tr>
          <tr style="background:#f9f9f9">
            <td style="padding:8px; font-weight:bold">Cargo:</td>
            <td style="padding:8px">${tramite.cargo || '-'}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold">Teléfono:</td>
            <td style="padding:8px">${tramite.telefono || '-'}</td>
          </tr>
          <tr style="background:#f9f9f9">
            <td style="padding:8px; font-weight:bold">Email:</td>
            <td style="padding:8px">${tramite.email || '-'}</td>
          </tr>
        </table>

        <h3 style="color: #2c3e50;">Solicitantes</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px">
          <thead>
            <tr style="background:#2c3e50; color:white">
              <th style="border:1px solid #ddd;padding:8px">Apellido</th>
              <th style="border:1px solid #ddd;padding:8px">Nombres</th>
              <th style="border:1px solid #ddd;padding:8px">CUIL</th>
              <th style="border:1px solid #ddd;padding:8px">Mail</th>
              <th style="border:1px solid #ddd;padding:8px">Teléfono</th>
              <th style="border:1px solid #ddd;padding:8px">Oficina</th>
              <th style="border:1px solid #ddd;padding:8px">Perfil</th>
            </tr>
          </thead>
          <tbody>
            ${tablaHtml}
          </tbody>
        </table>

        <p style="color:#888; font-size:12px; border-top:1px solid #ddd; padding-top:10px">
          Este correo fue generado automáticamente por el sistema de autogestión de accesos SIGEDOC.
        </p>
      </div>
    `;

    const msg = {
      to: process.env.EMAIL_DESTINO,
      from: process.env.EMAIL_FROM,
      subject: `[SIGEDOC] Nueva solicitud — ${tramite.apellido_encargado}, ${tramite.nombre_encargado}`,
      html,
      attachments: [
        {
          content: docBuffer.toString('base64'),
          filename: `solicitud-tramite-${tramite.id_tramite}.docx`,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(msg);
    console.log(`[Email] Notificación enviada para trámite ${tramite.id_tramite}`);
  }
}

module.exports = SendGridEmailService;
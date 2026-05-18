// Archivo: infrastructure/email/templates/sigedoc-email.template.js

const generarTemplateHtml = (textoPrincipal) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      
      <div style="background-color: #1a3a5c; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 18px; letter-spacing: 1px;">
          SUBSECRETARÍA DE DESARROLLO PRODUCTIVO
        </h1>
        <p style="color: #a8c4e0; margin: 6px 0 0 0; font-size: 13px;">
          Sistema de Autogestión de Accesos — SiGeDoc
        </p>
      </div>
  
      <div style="padding: 32px 24px;">
        <p style="color: #333; font-size: 15px;">Estimado/a,</p>
        
        <div style="color: #333; font-size: 15px; line-height: 1.6;">
          ${textoPrincipal}
        </div>
        
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
  `;
};

module.exports = { generarTemplateHtml };
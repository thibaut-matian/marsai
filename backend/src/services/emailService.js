const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMailToDirector = async (to, subject, message) => {
  return transporter.sendMail({
    from: `"MarsAI Modération" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    text: message,
  });
};

/**
 * Envoie l'email de confirmation de réservation avec le QR code en pièce jointe
 */
const sendTicketConfirmation = async (ticket) => {
  // Générer le QR code en base64 (image PNG)
  const qrCodeBase64 = await QRCode.toDataURL(ticket.qr_token);
  // Extraire uniquement les données base64 (sans le préfixe "data:image/png;base64,")
  const qrCodeData = qrCodeBase64.replace(/^data:image\/png;base64,/, "");

  return transporter.sendMail({
    from: `"MarsAI Festival" <${process.env.EMAIL_USER}>`,
    to: ticket.email,
    subject: `🎟️ Confirmation de réservation - ${ticket.ticket_type}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #000; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="text-align: center; font-weight: 300; letter-spacing: 4px;">MARS AI FESTIVAL</h1>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        
        <p>Bonjour <strong>${ticket.firstname} ${ticket.lastname}</strong>,</p>
        <p>Votre réservation est confirmée !</p>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 4px 0;"><span style="color: #aaa;">Billet :</span> <strong>${ticket.ticket_type}</strong></p>
          <p style="margin: 4px 0;"><span style="color: #aaa;">Email :</span> ${ticket.email}</p>
        </div>

        <p style="text-align: center; color: #aaa; font-size: 12px;">Présentez ce QR code à l'entrée du festival</p>
        <div style="text-align: center; margin: 16px 0;">
          <img src="cid:qrcode" alt="QR Code" style="width: 200px; height: 200px; border-radius: 8px;" />
        </div>

        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        <p style="text-align: center; color: #666; font-size: 11px;">Ce QR code est strictement personnel et ne peut être utilisé qu'une seule fois.</p>
      </div>
    `,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeData,
        encoding: "base64",
        cid: "qrcode", // référencé dans le HTML via "cid:qrcode"
      },
    ],
  });
};

module.exports = {
  sendMailToDirector,
  sendTicketConfirmation
};
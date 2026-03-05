const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const puppeteer = require("puppeteer");

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
}; /**
 * Génère un PDF de billet avec le QR code et les infos du ticket via Puppeteer
 * Retourne un Buffer
 */
const generateTicketPDFWithPuppeteer = async (ticket) => {
  const qrCodeBase64 = await QRCode.toDataURL(ticket.qr_token);

  const html = `
    <html>
      <head>
        <meta charset='utf-8'>
        <style>
          body { background: #181A1B; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 480px; margin: 32px auto; border-radius: 18px; box-shadow: 0 4px 24px #0008; background: #232526; padding: 32px 24px; }
          h1 { text-align: left; font-weight: 700; letter-spacing: 3px; margin-bottom: 4px; color: #fff; font-size: 2rem; }
          .dates { color: #e53935; font-size: 1.1rem; font-weight: 600; margin-bottom: 18px; letter-spacing: 1px; }
          .infos { margin: 24px 0; font-size: 1.1rem; }
          .infos div { margin-bottom: 8px; }
          .label { color: #bbb; font-weight: 500; margin-right: 6px; }
          .qr { text-align: right; margin: 24px 0; }
          .qr img { border-radius: 12px; box-shadow: 0 2px 8px #0006; }
          .footer { color: #aaa; font-size: 12px; text-align: center; margin-top: 32px; }
          .row { display: flex; justify-content: space-between; align-items: flex-start; }
          .left { flex: 1; }
          .right { flex: 1; text-align: right; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="left">
              <h1>MARS AI FESTIVAL</h1>
              <div class="dates">${ticket.event_date}</div>
              <div class="infos">
                <div><span class="label">Nom :</span> ${ticket.firstname} ${ticket.lastname}</div>
                <div><span class="label">Email :</span> ${ticket.email}</div>
                <div><span class="label">Pass :</span> ${ticket.ticket_type}</div>
              </div>
            </div>
            <div class="right qr">
              <img src="${qrCodeBase64}" width="140" height="140" />
              <div style="color:#bbb; font-size:12px; margin-top:8px;">QR à présenter</div>
            </div>
          </div>
          <div class="footer">Ce billet est strictement personnel et ne peut être utilisé qu'une seule fois.</div>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A5", printBackground: true });
  await browser.close();
  return pdfBuffer;
};

/**
 * Envoie l'email de confirmation de réservation avec le billet PDF en pièce jointe (Puppeteer)
 */
const sendTicketConfirmationPDF = async (ticket) => {
  const pdfBuffer = await generateTicketPDFWithPuppeteer(ticket);
  return transporter.sendMail({
    from: `"MarsAI Festival" <${process.env.EMAIL_USER}>`,
    to: ticket.email,
    subject: `🎟️ Votre billet - ${ticket.ticket_type}`,
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
        <p style="text-align: center; color: #aaa; font-size: 12px;">Votre billet PDF est en pièce jointe.</p>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        <p style="text-align: center; color: #666; font-size: 11px;">Ce billet est strictement personnel et ne peut être utilisé qu'une seule fois.</p>
      </div>
    `,
    attachments: [
      {
        filename: `Billet_MarsAI_${ticket.firstname}_${ticket.lastname}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};

/**
 * Envoie l'email d'invitation jury avec un lien vers le dashboard
 */
const sendJuryInvitation = async (jury) => {
  const dashboardUrl = `http://localhost:5173/jury/DashboardJury?token=${jury.token}`;
  
  return transporter.sendMail({
    from: `"MarsAI Festival" <${process.env.EMAIL_USER}>`,
    to: jury.mail,
    subject: `🎭 Invitation Jury - MarsAI Festival`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #000; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="text-align: center; font-weight: 300; letter-spacing: 4px;">MARS AI FESTIVAL</h1>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        
        <p>Bonjour <strong>${jury.firstname} ${jury.lastname}</strong>,</p>
        <p>Vous avez été sélectionné(e) comme membre du jury pour le MarsAI Festival.</p>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 4px 0;"><span style="color: #aaa;">Rôle :</span> <strong>${jury.role}</strong></p>
          <p style="margin: 4px 0;"><span style="color: #aaa;">Email :</span> ${jury.mail}</p>
        </div>

        <p style="color: #aaa; font-size: 14px; margin: 20px 0;">
          Accédez à votre espace jury pour découvrir les œuvres à évaluer et commencer le processus de notation.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${dashboardUrl}" 
             style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; 
                    font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            🎭 Accéder à mon espace jury
          </a>
        </div>

        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        <p style="text-align: center; color: #666; font-size: 11px;">
          Ce lien vous donne accès à votre espace personnel de jury. Gardez cet email précieusement.
        </p>
      </div>
    `,
  });
};

const sendModerationVideo = async (to, subject, message) => {
  return transporter.sendMail({
    from: `"MarsAI Modération" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #000; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="text-align: center; font-weight: 300; letter-spacing: 4px; color: #fff;">MARS AI FESTIVAL</h1>
        <div style="text-align: center; color: #f59e0b; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">Espace Modération</div>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        
        <div style="line-height: 1.6; color: #ddd;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <hr style="border-color: rgba(255,255,255,0.2); margin: 24px 0;" />
        <p style="text-align: center; color: #666; font-size: 11px;">
          Ceci est un message automatique de l'équipe de modération MarsAI.
        </p>
      </div>
    `,
  });
};

//

//
module.exports = {
  sendJuryInvitation,
  sendTicketConfirmation,
  sendTicketConfirmationPDF,
  sendModerationVideo
};

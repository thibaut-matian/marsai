const nodemailer = require("nodemailer");

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMailToDirector = async (to, subject, message) => {
  // Cette fonction retourne une Promise que le controller attendra
  return transporter.sendMail({
    from: `"MarsAI Modération" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    text: message,
  });
};

module.exports = {
  sendMailToDirector
};
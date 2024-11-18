const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log(`Email sent to ${to} (Service)`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;

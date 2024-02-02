const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../states/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {
  setTestEmailSend(false);
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: "Confirmation code",
    text: `Tu codigo de confirmación es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      setTestEmailSend(false);
      return;
    }
    console.log("Email sent: " + info.response);
    setTestEmailSend(true);
  });
};

module.exports = sendEmail;

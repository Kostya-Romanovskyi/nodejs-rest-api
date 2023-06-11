const nodemailer = require("nodemailer");
require("dotenv").config();
const { GMAIL_EMAIL, GMAIL_PASSWORD_APP } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD_APP,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: GMAIL_EMAIL,
  };

  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;

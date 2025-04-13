const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "coc786255@gmail.com",
    pass: "sabv oscd qvpi vbzs",
  },
});

module.exports = { transporter };

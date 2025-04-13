const { transporter } = require("./Email.config");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("./EmailTemplate");

const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Occasion Style 👻" <coc786255@@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: "Verify your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Email Error", error);
  }
};

const WelcomeEmail = async (email, fname) => {
  try {
    const response = await transporter.sendMail({
      from: '"Occasion Style 👻" <coc786255@gmail.com>',
      to: email,
      subject: "Welcome to Our Website",
      text: "Welcome to Our Website",
      html: Welcome_Email_Template.replace("{name}", fname), // html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Email Error", error);
  }
};

module.exports = { sendVerificationCode, WelcomeEmail };

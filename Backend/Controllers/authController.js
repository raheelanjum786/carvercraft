const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationCode } = require("../middleware/Email");
const prisma = new PrismaClient();

const authController = {
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Signup
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "USER",
        },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  verifyotp: async (req, res) => {
    try {
      const { email, code } = req.body;

      console.log(`Verifying OTP for email: ${email}, code: ${code}`); // Log request data

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.verificationCode !== code) {
        console.error("Invalid OTP or email mismatch");
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Clear OTP after verification
      await prisma.user.update({
        where: { email },
        data: { verificationCode: null },
      });

      console.log("OTP verified successfully for email:", email); // Success log

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Forgot Password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate password reset token
      const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationCode: verificationCode,
        },
      });

      console.log("Generated OTP:", verificationCode); // Log the OTP for debugging

      await sendVerificationCode(email, verificationCode);
      res.status(200).json({ message: "Verification code sent to email" });

      // Here you would typically send an email with the reset link
      // For demo purposes, we'll just return the token
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          verificationCode: null,
        },
      });

      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get All Users
  // Get All Users
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany(); // Fetch all fields

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = {
  authController,
};

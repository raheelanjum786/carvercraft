const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach only userId to req.body while keeping existing data intact
    req.body = { ...req.body, userId: user.id };
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch user role from database
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ error: "User not found." });
    console.log(user.role);
    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next(); // Allow request to continue
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = { authMiddleware, isAdmin };

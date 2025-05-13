const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();

// Configure multer for design upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/card-designs";
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|ai|psd/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only image and design files are allowed!"));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single("design");

const cardOrderController = {
  // Create a new card order
  createCardOrder: async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const { cardTypeId, quantity, customerNotes } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!req.file) {
          return res.status(400).json({ error: "Design file is required" });
        }

        // Get card type to calculate total price
        const cardType = await prisma.cardType.findUnique({
          where: { id: parseInt(cardTypeId) },
        });

        if (!cardType) {
          return res.status(404).json({ error: "Card type not found" });
        }

        const totalPrice = cardType.price * parseInt(quantity);
        const designUrl = `/uploads/card-designs/${req.file.filename}`;

        const cardOrder = await prisma.cardOrder.create({
          data: {
            userId,
            cardTypeId: parseInt(cardTypeId),
            designUrl,
            quantity: parseInt(quantity),
            customerNotes,
            totalPrice,
          },
          include: {
            cardType: true,
          },
        });

        res.status(201).json(cardOrder);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all orders for a user
  getUserCardOrders: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware

      const cardOrders = await prisma.cardOrder.findMany({
        where: { userId },
        include: {
          cardType: true,
        },
        orderBy: { createdAt: "desc" },
      });

      res.json(cardOrders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all orders (admin only)
  getAllCardOrders: async (req, res) => {
    try {
      const cardOrders = await prisma.cardOrder.findMany({
        include: {
          cardType: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      res.json(cardOrders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific order
  getCardOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // From auth middleware
      const isAdmin = req.user.role === "admin";

      const cardOrder = await prisma.cardOrder.findUnique({
        where: { id: parseInt(id) },
        include: {
          cardType: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!cardOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Check if the user is authorized to view this order
      if (!isAdmin && cardOrder.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      res.json(cardOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update order status (admin only)
  updateCardOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const cardOrder = await prisma.cardOrder.update({
        where: { id: parseInt(id) },
        data: { status },
        include: {
          cardType: true,
        },
      });

      res.json(cardOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Cancel an order (user can cancel their own pending orders)
  cancelCardOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // From auth middleware
      const isAdmin = req.user.role === "admin";

      // Check if order exists and belongs to user
      const cardOrder = await prisma.cardOrder.findUnique({
        where: { id: parseInt(id) },
      });

      if (!cardOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Only allow cancellation if admin or if it's the user's order and it's pending
      if (
        !isAdmin &&
        (cardOrder.userId !== userId || cardOrder.status !== "pending")
      ) {
        return res.status(403).json({
          error: "You can only cancel your own pending orders",
        });
      }

      const updatedOrder = await prisma.cardOrder.update({
        where: { id: parseInt(id) },
        data: { status: "cancelled" },
      });

      res.json({
        message: "Order cancelled successfully",
        order: updatedOrder,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = cardOrderController;

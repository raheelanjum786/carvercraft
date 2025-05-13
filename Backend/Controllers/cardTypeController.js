const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/card-types";
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
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("cardImage");

const cardTypeController = {
  // Get all card types
  getAllCardTypes: async (req, res) => {
    try {
      const cardTypes = await prisma.cardType.findMany({
        where: { status: "active" },
        orderBy: { price: "asc" },
      });
      res.json(cardTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single card type
  getCardType: async (req, res) => {
    try {
      const cardType = await prisma.cardType.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!cardType) {
        return res.status(404).json({ error: "Card type not found" });
      }
      res.json(cardType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create card type (admin only)
  createCardType: async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        console.log("Request body:", req.body); // Debug log

        // Extract with default values to prevent undefined
        const name = req.body.name || "";
        const description = req.body.description || "";
        const price = req.body.price ? parseFloat(req.body.price) : 0;
        const imageUrl = req.body.imageUrl || "";

        // Validate required fields
        if (!name.trim()) {
          return res.status(400).json({ error: "Card name is required" });
        }

        if (isNaN(price) || price <= 0) {
          return res.status(400).json({ error: "Valid price is required" });
        }

        let finalImageUrl = imageUrl;

        // If file was uploaded, use that path instead
        if (req.file) {
          console.log("Uploaded file:", req.file); // Debug log
          finalImageUrl = `/uploads/card-types/${req.file.filename}`;
        }

        // Create with explicit values to avoid undefined
        const cardType = await prisma.cardType.create({
          data: {
            name: name.trim(),
            description: description.trim(),
            price: price,
            imageUrl: finalImageUrl,
            status: "active",
          },
        });

        console.log("Created card type:", cardType); // Debug log
        res.status(201).json(cardType);
      });
    } catch (error) {
      console.error("Error creating card type:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Update card type (admin only)
  updateCardType: async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const { name, description, price, status, imageUrl } = req.body;
        let finalImageUrl = imageUrl;

        // If file was uploaded, use that path instead
        if (req.file) {
          finalImageUrl = `/uploads/card-types/${req.file.filename}`;
        }

        const cardType = await prisma.cardType.update({
          where: { id: parseInt(req.params.id) },
          data: {
            name,
            description,
            price: parseFloat(price),
            status,
            imageUrl: finalImageUrl,
          },
        });
        res.json(cardType);
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete card type (admin only)
  deleteCardType: async (req, res) => {
    try {
      await prisma.cardType.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Card type deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = cardTypeController;

const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/products";
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
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
}).array("images", 5); // Allow up to 5 images

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Create product with images
const createProduct = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, category, price, description, benefits, isLatest } =
        req.body;

      // Get image URLs from uploaded files
      const imageUrls =
        req.files && req.files.length > 0
          ? req.files.map((file) => `/uploads/products/${file.filename}`)
          : [];

      const product = await prisma.product.create({
        data: {
          name,
          categoryId: parseInt(category),
          price: parseFloat(price),
          description,
          benefits,
          isLatest: isLatest === "true",
          status: "active",
          imageUrls: JSON.stringify(imageUrls), // Store as JSON string
        },
      });

      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, benefits, isLatest } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        price: parseFloat(price),
        description,
        benefits,
        isLatest,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductbyId,
};

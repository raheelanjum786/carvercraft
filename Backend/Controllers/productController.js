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
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Get reviews separately since they're not directly related in the schema
    const reviews = await prisma.review.findMany({
      where: {
        productId: parseInt(id),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response to match frontend expectations
    const formattedProduct = {
      ...product,
      images: product.imageUrls ? JSON.parse(product.imageUrls) : [],
      reviews: reviews,
      rating:
        reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0,
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Add a new review to a product
const addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId: parseInt(id),
        userId,
      },
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this product" });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        productId: parseInt(id),
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get related products based on category
const getRelatedProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: parseInt(categoryId),
      },
      take: 4,
      include: {
        category: true,
      },
    });

    // Format the products to include parsed image URLs
    const formattedProducts = relatedProducts.map((product) => ({
      ...product,
      images: product.imageUrls ? JSON.parse(product.imageUrls) : [],
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ error: error.message });
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

      const { name, category, price, description, isLatest } = req.body;
      // Removed benefits from destructuring

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
          // Removed benefits field
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
    const { name, category, price, description, isLatest } = req.body;
    // Removed benefits from destructuring

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        price: parseFloat(price),
        description,
        // Removed benefits field
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
      where: { id: parseInt(id) }, // Convert string id to integer
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Make sure to add these to your module.exports
module.exports = {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductbyId,
  addProductReview,
  getRelatedProducts,
};

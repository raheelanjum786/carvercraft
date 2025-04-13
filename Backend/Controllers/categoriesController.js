const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name, status = "active" } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name.toLowerCase(),
        },
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        status,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        status,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has associated products
    const categoryWithProducts = await prisma.category.findFirst({
      where: { id },
      include: { products: true },
    });

    if (categoryWithProducts?.products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category with associated products",
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

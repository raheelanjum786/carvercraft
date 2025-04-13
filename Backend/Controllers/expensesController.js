const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const expenseController = {
  // Get all expenses
  getAllExpenses: async (req, res) => {
    try {
      const expenses = await prisma.expense.findMany({
        orderBy: { date: "desc" },
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single expense
  getExpense: async (req, res) => {
    try {
      const expense = await prisma.expense.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create expense
  createExpense: async (req, res) => {
    try {
      console.log("Received Data:", req.body);
      const { productId, amount, date, ...otherData } = req.body;

      // Validate amount
      const parsedAmount = parseFloat(amount);

      // Validate date
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date provided." });
      }

      const expense = await prisma.expense.create({
        data: {
          ...otherData,
          amount: parsedAmount,
          date: parsedDate,
          product: productId
            ? {
                connect: { id: parseInt(productId) },
              }
            : undefined,
        },
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update expense
  updateExpense: async (req, res) => {
    try {
      const { productId, amount, date, ...otherData } = req.body;

      // Validate amount
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        return res.status(400).json({ error: "Invalid amount provided." });
      }

      // Validate date
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date provided." });
      }

      const expense = await prisma.expense.update({
        where: { id: parseInt(req.params.id) },
        data: {
          ...otherData,
          amount: parsedAmount,
          date: parsedDate,
          product: productId
            ? {
                connect: { id: parseInt(productId) },
              }
            : undefined,
        },
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      res.json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete expense
  deleteExpense: async (req, res) => {
    try {
      await prisma.expense.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get expenses by product
  getExpensesByProduct: async (req, res) => {
    try {
      const expenses = await prisma.expense.findMany({
        where: {
          productId: parseInt(req.params.productId),
        },
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        orderBy: { date: "desc" },
      });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = expenseController;

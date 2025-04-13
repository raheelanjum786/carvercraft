const express = require("express");
const router = express.Router();
const expenseController = require("../Controllers/expensesController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/getAll", isAdmin, expenseController.getAllExpenses);
router.get("/:id", isAdmin, expenseController.getExpense);
router.post("/create", isAdmin, expenseController.createExpense);
router.put("/update/:id", isAdmin, expenseController.updateExpense);
router.delete("/:id", isAdmin, expenseController.deleteExpense);
router.get(
  "/product/:productId",
  isAdmin,
  expenseController.getExpensesByProduct
);

module.exports = router;

const express = require("express");
const router = express.Router();
const employerController = require("../Controllers/employerController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get(
  "/getAll",

  isAdmin,
  employerController.getAllEmployers
);
router.get(
  "/employer/:id",

  isAdmin,
  employerController.getEmployer
);
router.post(
  "/create",

  isAdmin,
  employerController.createEmployer
);
router.put(
  "/update/:id",

  isAdmin,
  employerController.updateEmployer
);
router.delete(
  "/:id",

  isAdmin,
  employerController.deleteEmployer
);

module.exports = router;

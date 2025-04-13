const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const employerController = {
  // Get all employers
  getAllEmployers: async (req, res) => {
    try {
      const employers = await prisma.employer.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(employers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single employer
  getEmployer: async (req, res) => {
    try {
      const employer = await prisma.employer.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!employer) {
        return res.status(404).json({ error: "Employer not found" });
      }
      res.json(employer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create employer
  createEmployer: async (req, res) => {
    try {
      const employer = await prisma.employer.create({
        data: {
          ...req.body,
          salary: parseFloat(req.body.salary),
          startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        },
      });
      res.status(201).json(employer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update employer
  updateEmployer: async (req, res) => {
    try {
      const employer = await prisma.employer.update({
        where: { id: parseInt(req.params.id) },
        data: {
          ...req.body,
          salary: parseFloat(req.body.salary),
          startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        },
      });
      res.json(employer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete employer
  deleteEmployer: async (req, res) => {
    try {
      await prisma.employer.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Employer deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = employerController;

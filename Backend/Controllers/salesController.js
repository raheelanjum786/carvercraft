const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const salesController = {
  // Get sales overview data
  getSalesOverview: async (req, res) => {
    try {
      // Get current date and calculate date 6 months ago
      const currentDate = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

      // Get all sales from the last 6 months
      const sales = await prisma.sale.findMany({
        where: {
          date: {
            gte: sixMonthsAgo,
          },
        },
        orderBy: {
          date: "asc",
        },
        include: {
          order: true,
          customer: true,
        },
      });

      // Calculate total sales amount
      const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

      // Get unique customers
      const uniqueCustomers = new Set(
        sales.map((sale) => sale.customerId).filter(Boolean)
      ).size;

      // Calculate average revenue per order
      const avgRevenue = sales.length > 0 ? totalSales / sales.length : 0;

      // Group sales by month and source
      const monthlyData = {};
      const sources = new Set();

      sales.forEach((sale) => {
        const month = sale.date.toLocaleString("default", { month: "short" });
        sources.add(sale.source);

        if (!monthlyData[month]) {
          monthlyData[month] = {};
        }

        if (!monthlyData[month][sale.source]) {
          monthlyData[month][sale.source] = 0;
        }

        monthlyData[month][sale.source] += sale.amount;
      });

      // Format data for charts
      const channelsData = Object.keys(monthlyData).map((month) => {
        const data = { name: month };
        Array.from(sources).forEach((source) => {
          data[source] = monthlyData[month][source] || 0;
        });
        return data;
      });

      // Get top selling products
      const topProducts = await prisma.orderProduct.groupBy({
        by: ["productId"],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });

      const topProductsWithDetails = await Promise.all(
        topProducts.map(async (item) => {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          return {
            id: product.id,
            name: product.name,
            quantity: item._sum.quantity,
            revenue: product.price * item._sum.quantity,
          };
        })
      );

      res.status(200).json({
        overview: {
          totalSales,
          uniqueCustomers,
          avgRevenue,
        },
        channelsData,
        topProducts: topProductsWithDetails,
      });
    } catch (error) {
      console.error("Error fetching sales overview:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new sale record
  createSale: async (req, res) => {
    try {
      const { amount, orderId, source, date, customerId } = req.body;

      const sale = await prisma.sale.create({
        data: {
          amount: parseFloat(amount),
          orderId: orderId ? parseInt(orderId) : null,
          source,
          date: new Date(date),
          customerId: customerId ? parseInt(customerId) : null,
        },
      });

      res.status(201).json(sale);
    } catch (error) {
      console.error("Error creating sale:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get monthly sales report
  getMonthlySalesReport: async (req, res) => {
    try {
      const { month, year } = req.params;

      // Convert month name to number (0-11)
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthIndex = monthNames.findIndex(
        (m) => m.toLowerCase() === month.toLowerCase()
      );

      if (monthIndex === -1) {
        return res.status(400).json({ error: "Invalid month name" });
      }

      const startDate = new Date(parseInt(year), monthIndex, 1);
      const endDate = new Date(parseInt(year), monthIndex + 1, 0);

      const sales = await prisma.sale.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          order: true,
        },
      });

      // Group by source
      const sourceData = {};
      sales.forEach((sale) => {
        if (!sourceData[sale.source]) {
          sourceData[sale.source] = 0;
        }
        sourceData[sale.source] += sale.amount;
      });

      res.status(200).json({
        month,
        year,
        totalSales: sales.reduce((sum, sale) => sum + sale.amount, 0),
        totalOrders: new Set(sales.map((sale) => sale.orderId).filter(Boolean))
          .size,
        sourceData,
      });
    } catch (error) {
      console.error("Error fetching monthly sales report:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = salesController;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orders with optional filtering by status or search term
const getProductOrders = async (req, res) => {
  const { status, search } = req.query;

  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          status && status !== "all" ? { status } : {},
          search
            ? {
                OR: [
                  { id: parseInt(search) || undefined },
                  { customerName: { contains: search, mode: "insensitive" } },
                  {
                    orderProducts: {
                      some: {
                        product: {
                          name: { contains: search, mode: "insensitive" },
                        },
                      },
                    },
                  },
                ],
              }
            : {},
          {
            orderProducts: {
              some: {},
            },
          },
        ],
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

// Get a specific order by ID
const getProductOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ error: "Failed to fetch order." });
  }
};

// Update order status
const updateProductOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status." });
  }
};

const createProductOrder = async (req, res) => {
  try {
    const { orders } = req.body;

    const createdOrders = await Promise.all(
      orders.map(async (orderData) => {
        const {
          customerName,
          customerEmail,
          customerPhone,
          itemId,
          paymentMethod,
          quantity,
          shippingAddress,
          status,
        } = orderData;

        // Create the order
        const order = await prisma.order.create({
          data: {
            userId: req.user.id, // Assuming you have user authentication
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            paymentMethod,
            status,
            total: 0, // You'll need to calculate this based on product price
            orderProducts: {
              create: {
                productId: itemId,
                quantity,
              },
            },
          },
          include: {
            orderProducts: {
              include: {
                product: true,
              },
            },
          },
        });

        // Calculate and update the total
        const total = order.orderProducts.reduce(
          (sum, op) => sum + op.product.price * op.quantity,
          0
        );

        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: { total },
        });

        return updatedOrder;
      })
    );

    res.status(201).json({
      success: true,
      message: "Orders created successfully",
      data: createdOrders,
    });
  } catch (error) {
    console.error("Error creating orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create orders",
      error: error.message,
    });
  }
};

module.exports = {
  getProductOrders,
  getProductOrderById,
  updateProductOrderStatus,
  createProductOrder,
};

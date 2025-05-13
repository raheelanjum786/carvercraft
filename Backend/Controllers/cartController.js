const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cartController = {
  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity, userId } = req.body;

      // Check if user has a cart
      let cart = await prisma.cart.findFirst({
        where: { userId: parseInt(userId) },
      });

      // If no cart exists, create one
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: parseInt(userId) },
        });
      }

      // Check if item already exists in cart
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId ? parseInt(productId) : null,
        },
      });

      if (existingItem) {
        // Update quantity if item exists
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + parseInt(quantity) },
        });
      } else {
        // Add new item to cart
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: productId ? parseInt(productId) : null,
            quantity: parseInt(quantity),
          },
        });
      }

      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get cart items
  getCartItems: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      // Find user's cart
      const cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) {
        return res.status(200).json([]);
      }

      res.status(200).json(cart.items);
    } catch (error) {
      console.error("Error getting cart items:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const cartItemId = parseInt(req.params.cartItemId);

      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update item quantity
  updateQuantity: async (req, res) => {
    try {
      const { cartItemId, quantity } = req.body;

      await prisma.cartItem.update({
        where: { id: parseInt(cartItemId) },
        data: { quantity: parseInt(quantity) },
      });

      res.status(200).json({ message: "Quantity updated successfully" });
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      const cart = await prisma.cart.findFirst({
        where: { userId },
      });

      if (cart) {
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartController;

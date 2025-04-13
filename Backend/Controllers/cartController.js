const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addToCart = async (req, res) => {
  const { userId, productId, giftId, quantity } = req.body;
  console.log(productId, giftId, quantity);
  if (giftId) {
    try {
      // Check if product exists
      const gift = await prisma.gift.findUnique({
        where: { id: giftId },
      });

      console.log(`Gift: ${giftId}`);
      if (!gift) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (gift.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock available" });
      }

      // Check if the user already has a cart
      let cart = await prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        // Create a new cart if not exists
        cart = await prisma.cart.create({
          data: { userId },
        });
      }

      // Check if the item is already in the cart
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          giftId,
        },
      });

      if (existingCartItem) {
        // Update the quantity of the existing item
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        // Add the new item to the cart
        await prisma.cartItem.create({
          data: {
            giftId,
            quantity,
            cartId: cart.id,
          },
        });
      }

      res.json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    try {
      // Check if product exists
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock available" });
      }

      // Check if the user already has a cart
      let cart = await prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        // Create a new cart if not exists
        cart = await prisma.cart.create({
          data: { userId },
        });
      }

      // Check if the item is already in the cart
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (existingCartItem) {
        // Update the quantity of the existing item
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        // Add the new item to the cart
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }

      res.json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;
  const userIdInt = parseInt(userId);
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: userIdInt },
      include: {
        items: {
          include: { product: true, gift: true },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  console.log("Received cartItemId:", cartItemId); // Debug log
  try {
    if (!cartItemId) {
      return res.status(400).json({ error: "Cart item ID is required." });
    }

    await prisma.cartItem.delete({
      where: { id: parseInt(cartItemId) },
    });

    res.json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the item." });
  }
};

// Update item quantity in the cart
exports.updateQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  try {
    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
    console.log(cartItemId);
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Clear the cart for a specific user
exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userIdInt = parseInt(userId);

    const cart = await prisma.cart.findFirst({
      where: { userId: userIdInt },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

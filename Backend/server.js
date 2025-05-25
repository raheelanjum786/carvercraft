require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const authRoute = require("./Routes/authRoute");
const categoriesRoute = require("./Routes/categoriesRoute");
const productRoute = require("./Routes/productRoutes");
const employerRoute = require("./Routes/employerRoute");
const expensesRoute = require("./Routes/expensesRoute");
const productOrderRoute = require("./Routes/productOrderRoute");
const newsletterRoutes = require("./Routes/subscriptionRoute");
const cartRoute = require("./Routes/cartRoute");
const cardTypeRoute = require("./Routes/cardTypeRoute");
const cardOrderRoute = require("./Routes/cardOrderRoute");
const salesRoute = require("./Routes/salesRoute");
const adminSettingsRoute = require("./Routes/adminSettingsRoute");
const app = express();
const { authMiddleware } = require("./middleware/authMiddleware");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/auth/users", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productRoute);
app.use("/api/employers", employerRoute);
app.use("/api/expenses", expensesRoute);
app.use("/api/productOrder", authMiddleware, productOrderRoute);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/cart", authMiddleware, cartRoute);
app.use("/api/cardTypes", cardTypeRoute);
app.use("/api/cardOrders", cardOrderRoute);
app.use("/api/sales", salesRoute);
app.use("/api/admin/settings", adminSettingsRoute);
app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const stripeRoutes = require("./Routes/stripeRoutes");

app.use("/api/stripe", stripeRoutes);

app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

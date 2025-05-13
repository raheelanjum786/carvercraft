const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedSalesData() {
  console.log("Seeding sales data...");

  // Get existing orders and users
  const orders = await prisma.order.findMany();
  const users = await prisma.user.findMany();

  if (orders.length === 0) {
    console.log("No orders found. Please seed orders first.");
    return;
  }

  // Sources for sales
  const sources = ["facebook", "direct", "organic", "referral", "google"];

  // Create sales for each order
  for (const order of orders) {
    // Create 1-3 sales records per order
    const numSales = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numSales; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const amount = order.total / numSales;
      
      // Create a date within the last 6 months
      const date = new Date();
      date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
      
      await prisma.sale.create({
        data: {
          amount,
          orderId: order.id,
          source,
          date,
          customerId: order.userId,
        },
      });
    }
  }

  // Create some additional sales not tied to orders
  for (let i = 0; i < 20; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const amount = Math.random() * 1000 + 100; // Random amount between 100 and 1100
    
    // Create a date within the last 6 months
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    
    // Randomly assign to a user or leave null
    const customerId = Math.random() > 0.3 
      ? users[Math.floor(Math.random() * users.length)].id 
      : null;
    
    await prisma.sale.create({
      data: {
        amount,
        orderId: null,
        source,
        date,
        customerId,
      },
    });
  }

  console.log("Sales data seeded successfully!");
}

seedSalesData()
  .catch((e) => {
    console.error("Error seeding sales data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

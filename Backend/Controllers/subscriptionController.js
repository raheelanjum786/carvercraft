// controllers/newsletterController.js
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // your app-specific password
  },
});

// Subscribe to newsletter
const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed." });
    }

    await prisma.subscriber.create({
      data: {
        email,
        createdAt: new Date(),
      },
    });

    // Send welcome email to new subscriber
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Newsletter!",
      html: `
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h2>Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
          <p>You'll receive updates about our latest news and offerings.</p>
          <p>Best regards,<br>Your Team</p>
        </div>
      `,
    };

    await transporter.sendMail(welcomeMailOptions);

    return res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all subscribers
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Send newsletter to selected subscribers
const sendNewsletter = async (req, res) => {
  const { emails, subject, body } = req.body;

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: "No recipients selected." });
  }

  if (!subject || !body) {
    return res.status(400).json({ message: "Subject and body are required." });
  }

  try {
    // Verify all emails exist in database
    const subscribers = await prisma.subscriber.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    if (subscribers.length !== emails.length) {
      return res
        .status(400)
        .json({ message: "Some email addresses are invalid." });
    }

    // Send newsletter to all selected subscribers
    const mailOptions = {
      from: process.env.EMAIL_USER,
      subject: subject,
      html: `
        <div style="padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px;">
            ${body}
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              You received this email because you're subscribed to our newsletter.
              <br>
              To unsubscribe, <a href="${process.env.WEBSITE_URL}/unsubscribe">click here</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send emails in batches of 50 to avoid rate limits
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const promises = batch.map((email) => {
        return transporter.sendMail({
          ...mailOptions,
          to: email,
          bcc: undefined,
        });
      });

      await Promise.all(promises);

      // Add delay between batches to prevent rate limiting
      if (i + batchSize < emails.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Log the newsletter sending
    await prisma.newsletterLog.create({
      data: {
        subject,
        content: body,
        recipientCount: emails.length,
        sentAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "Newsletter sent successfully!",
      recipientCount: emails.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to send newsletter.",
      error: error.message,
    });
  }
};

// Unsubscribe from newsletter
const unsubscribeFromNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found." });
    }

    await prisma.subscriber.delete({
      where: { email },
    });

    // Send confirmation email
    const unsubscribeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Unsubscribe Confirmation",
      html: `
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h2>Unsubscribe Confirmation</h2>
          <p>You have been successfully unsubscribed from our newsletter.</p>
          <p>We're sorry to see you go. If you change your mind, you can always subscribe again.</p>
          <p>Best regards,<br>Your Team</p>
        </div>
      `,
    };

    await transporter.sendMail(unsubscribeMailOptions);

    return res.status(200).json({ message: "Successfully unsubscribed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get newsletter sending logs
const getNewsletterLogs = async (req, res) => {
  try {
    const logs = await prisma.newsletterLog.findMany({
      orderBy: {
        sentAt: "desc",
      },
    });
    return res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  subscribeToNewsletter,
  getSubscribers,
  sendNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterLogs,
};

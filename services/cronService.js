const cron = require("node-cron");
const axios = require("axios");
const Subscription = require("../models/subscription");
const sendEmail = require("./emailService");

// Mock external API URL (replace with your actual API)
const PRICE_API_URL = process.env.PRICE_API_URL;

// Cron job to check price every minute
cron.schedule("* * * * *", async () => {
  console.log("Running price check job...");

  try {
    // Fetch the current price from the external API
    const response = await axios.get(PRICE_API_URL);
    const currencies = response.data;

    // Fetch all subscriptions from the database
    const subscriptions = await Subscription.find();

    for (const sub of subscriptions) {
      const currency = currencies.find((item) => item.id === sub.id);
      if (
        currency.current_price >= sub.price ||
        currency.current_price <= sub.price
      ) {
        const message = `Price Alert: The current price is ${currency.current_price}, which meets your target of ${sub.price}.`;
        await sendEmail(sub.email, "Price Alert Notification", message);
        console.log(`Email sent to ${sub.email} (CRON)`);
      }
    }
  } catch (error) {
    console.error("Error in price check job:", error.message);
  }
});

module.exports = cron;

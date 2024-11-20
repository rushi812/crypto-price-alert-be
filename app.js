const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
require("dotenv").config();
require("./services/cronService");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'https://price-alert-812.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB
connectDB(DB);

// Routes
app.use("/api/subscriptions", subscriptionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

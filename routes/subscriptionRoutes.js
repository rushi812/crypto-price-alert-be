const express = require("express");
const Subscription = require("../models/subscription");
const router = express.Router();

// POST route to create a subscription
router.post("/", async (req, res) => {
  const { id, email, price } = req.body;

  if (!id || !email || !price) {
    return res
      .status(400)
      .json({ error: "id, Email and target price are required" });
  }

  try {
    const subscription = new Subscription({ id, email, price });
    await subscription.save();

    res
      .status(200)
      .json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    res.status(500).json({ error: "Error saving subscription" });
  }
});

module.exports = router;

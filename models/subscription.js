const mongoose = require("mongoose");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const subscriptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  alertSent: {type: Boolean, default: false},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  paymentId: String,         // Razorpay payment ID
  orderId: String,           // Razorpay order ID
  amount: Number,            // In paisa (e.g., 50000 = ₹500)
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);

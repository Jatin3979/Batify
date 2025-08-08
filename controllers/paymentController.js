const razorpay = require("../utils/razorpay");
const userModel = require("../models/user-model");
const crypto = require("crypto");
const Order = require("../models/order-model");
const Product = require("../models/product-model");

module.exports.createorder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // ₹500 = 50000 paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.checkout = async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let totalBill = user.cart.reduce((acc, item) => {
    return acc + (item.price + 20 - item.discount);
  }, 0);
  res.render("checkout", { totalBill });
};


module.exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // ✅ Step 1: Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ verified: false, message: "❌ Signature verification failed" });
    }

    // ✅ Step 2: Get user using email from req.user (already decoded)
    const user = await userModel.findOne({ email: req.user.email }).populate("cart");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ verified: false, message: "❌ Cart is empty or user not found" });
    }

    // ✅ Step 3: Calculate total amount (in paisa)
    const amount = user.cart.reduce((total, item) => {
      return total + (item.price + 20 - item.discount); // 20 = platform fee
    }, 0) * 100;

    // ✅ Step 4: Save the order
    const newOrder = await Order.create({
      user: user._id,
      products: user.cart.map(p => p._id),
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount,
      status: "paid",
    });

    // ✅ Step 5: Link order to user and empty the cart
    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

    // ✅ Step 6: Redirect to invoice
    return res.json({
      verified: true,
      redirectUrl: `/payment/invoice?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}&amount=${amount}`,
    });

  } catch (err) {
    console.error("🔥 Error verifying payment:", err);
    return res.status(500).json({ verified: false, message: "❌ Internal Server Error" });
  }
};


module.exports.invoice=async (req, res) => {
  try {
    const { payment_id, order_id, amount } = req.query;

    res.render("invoice", {
      payment_id,
      order_id,
      amount,
      date: new Date().toLocaleString(),
      user: req.user, // assuming you have auth middleware
    });
  } catch (err) {
    console.error("Invoice render error:", err);
    res.status(500).send("Something went wrong while generating the invoice.");
  }
};


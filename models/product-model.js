const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer, // Can store as Buffer or change to URL later
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    default: "JK",
  },
  category: {
    type: String, // Example: "Cricket Bat", "Tennis Racket"
    default:"Bat",
  },
  material: {
    type: String, // Example: "English Willow"
  },
  size: {
    type: String, // Example: "Full Size", "Youth"
  },
  weight: {
    type: String, // Example: "1.2kg"
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
    default: "#f9fafb", 
  },
  panelcolor: {
    type: String,
    default: "#6b737aff", 
  },
  textcolor: {
    type: String,
    default: "#111827", 
  },
});

module.exports = mongoose.model("product", productSchema);

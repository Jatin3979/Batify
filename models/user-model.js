const { ref } = require("joi");
const mongoose = require("mongoose");
const productModel = require("./product-model");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },

  picure: String,
});

module.exports = mongoose.model("user", userSchema);

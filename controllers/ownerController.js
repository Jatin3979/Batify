const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.createProducts = (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
};
module.exports.dashboard = async (req, res) => {
  try {
    // Fetch all orders with user & product details
    let orders = await orderModel
      .find()
      .populate("user", "fullname email")
      .populate("products", "name price image");

    res.render("admin", {
      orders,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while loading dashboard");
    res.redirect("/");
  }
};

module.exports.adminProducts = async function (req, res) {
  const products = await productModel.find();
  console.log(products);
  res.render("adminproducts", { products });
};

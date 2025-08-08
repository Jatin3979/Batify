const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.shop=async function (req, res, next) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
}

module.exports.addtocart=async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to Cart");
  res.redirect("/shop");
};

module.exports.cart= async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let totalBill = user.cart.reduce((acc, item) => {
    return acc + (item.price + 20 - item.discount);
  }, 0);
  res.render("cart", { user, totalBill });
}
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.shop = async function (req, res, next) {
  // let products = await productModel.find();
  let success = req.flash("success");
  let { fullname } = req.user;
  let { material } = req.query;
  let filter = {};
  if (material) filter.material = material;
  let products = await productModel.find(filter);
  res.render("shop", { products, fullname, success });
};

module.exports.addtocart = async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to Cart");
  res.redirect("/shop");
};

module.exports.cart = async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let totalBill = user.cart.reduce((acc, item) => {
    return acc + (item.price + 20 - item.discount);
  }, 0);
  res.render("cart", { user, totalBill });
};

module.exports.removecart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userEmail = req.user.email; // using email from req.user

    // Remove the product from the user's cart
    await userModel.findOneAndUpdate(
      { email: userEmail },
      { $pull: { cart: productId } } // if cart stores full product object
    );
    let users = await userModel.findOne({ email: req.user.email });
    res.redirect("/cart"); // reload cart page
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).send("Internal Server Error");
  }
};

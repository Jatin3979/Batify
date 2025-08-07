var express = require("express");
var router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { loggedin: req.user ? true : false });
});

router.get("/shop", isloggedin, async function (req, res, next) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/addtocart/:id", isloggedin, async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to Cart");
  res.redirect("/shop");
});

router.get("/cart", isloggedin, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let totalBill = user.cart.reduce((acc, item) => {
    return acc + (item.price + 20 - item.discount);
  }, 0);
  res.render("cart", { user, totalBill });
});
module.exports = router;

var express = require("express");
const { createProducts } = require("../controllers/ownerController");
const { isAdmin } = require("../middlewares/isAdmin");
const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const isloggedin = require("../middlewares/isloggedin");
var router = express.Router();
/* GET users listing. */

router.get("/", async (req, res) => {
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
});

router.get("/allproducts",isloggedin, isAdmin,async function (req, res) {
  const products= await productModel.find();
  console.log(products);
  res.render("adminproducts",{products});
});


router.get("/products",isloggedin,isAdmin,createProducts)



module.exports = router;

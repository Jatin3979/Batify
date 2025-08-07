const ownerValidationSchema = require("../validations/owner.validation");
const ownerModel = require("../models/owner-model");
var express = require("express");
const { createProducts } = require("../controllers/ownerController");
const { isAdmin } = require("../middlewares/isAdmin");
const productModel = require("../models/product-model");
const isloggedin = require("../middlewares/isloggedin");
var router = express.Router();
/* GET users listing. */
router.get("/",isloggedin, isAdmin,async function (req, res) {
  const products= await productModel.find();
  console.log(products);
  res.render("admin",{products});
});


router.get("/products",isAdmin,createProducts)



module.exports = router;

var express = require("express");
const {
  createProducts,
  dashboard,
  adminProducts,
} = require("../controllers/ownerController");
const { isAdmin } = require("../middlewares/isAdmin");

const isloggedin = require("../middlewares/isloggedin");
var router = express.Router();
/* GET users listing. */

router.get("/", dashboard);

router.get("/allproducts", isloggedin, isAdmin, adminProducts);

router.get("/products", isloggedin, isAdmin, createProducts);

module.exports = router;

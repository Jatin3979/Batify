var express = require("express");
var router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const { shop, addtocart, cart } = require("../controllers/indexController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { loggedin: req.user ? true : false });
});

router.get("/shop", isloggedin, shop);

router.get("/addtocart/:id", isloggedin, addtocart);

router.get("/cart", isloggedin,cart);
module.exports = router;

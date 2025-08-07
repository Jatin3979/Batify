var express = require("express");
var router = express.Router();
const productModel = require("../models/product-model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("product");
});

router.get

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "succesfully created");
    res.redirect("/owners/products");
  } catch (error) {
    res.send("eror")
  }
});

module.exports = router;

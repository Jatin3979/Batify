var express = require("express");
var router = express.Router();
const multer = require("multer");
const { createProduct } = require("../controllers/productController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("product");
});

// router.ge

router.post("/create", upload.single("image"),createProduct)

module.exports = router;

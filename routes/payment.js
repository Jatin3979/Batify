const express = require("express");
const {
  createorder,
  checkout,
  verifyPayment,
  invoice,
} = require("../controllers/paymentController");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");

router.post("/create-order", createorder);

router.get("/checkout", isloggedin, checkout);

router.post("/verify", isloggedin,verifyPayment);

router.get("/invoice", isloggedin,invoice);

module.exports = router;

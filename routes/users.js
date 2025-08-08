var express = require("express");
var router = express.Router();
const {registerUser,loginUser,logoutUser}= require("../controllers/authController");
const isloggedin=require("../middlewares/isloggedin");
const { myaccount } = require("../controllers/userController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/myaccount",isloggedin,myaccount)
module.exports = router;

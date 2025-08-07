var userModel = require("../models/user-model");
const userValdation = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { error } = userValdation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let { fullname, password, email } = req.body;
    let user = await userModel.find({ email });
    console.log(user);
    if (user.length > 0) return res.send("You alreday have an account");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let users = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(users);
          res.cookie("token", token);
          res.send("succefulty done");
        }
      });
    });
  } catch (error) {
    res.render("error", error);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  // console.log(email)
  let user = await userModel.findOne({ email });
  console.log(user);
  if (!user) {
    req.flash("error", "Wrong Credentials!!");
    return res.redirect("/");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      if (user.isAdmin) return res.redirect("/owners");
      res.redirect("/shop");
    } else {
      req.flash("error", "Wrong Credentials");
    }
  });
}; 

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

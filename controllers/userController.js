const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const orderModel = require("../models/order-model");

module.exports.myaccount = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { _id } = user;
  let orders = await orderModel
    .find({ user: _id })
    .populate("products")
    .sort({ createdAt: -1 });
    res.render("myaccount",{orders,user})
};

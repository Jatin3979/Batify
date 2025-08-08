const productModel = require("../models/product-model");

module.exports.createProduct=async (req, res) => {
  try {
    const { name, price, discount, brand, category, material, size, weight, stock, description } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      brand,
      category,
      material,
      size,
      weight,
      stock,
      description
    });

    req.flash("success", "successfully created");
    res.redirect("/owners/products");
  } catch (error) {
    console.error(error);
    res.send("error");
  }
};

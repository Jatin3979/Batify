const Joi = require("joi");

const productValidationSchema = Joi.object({
  image: Joi.binary(), // If you're storing image as Buffer
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(Joi.ref("price")).default(0),
  brand: Joi.string().max(50).default("JK"),
  category: Joi.string().max(50).default("Bat"),
  material: Joi.string().max(50).optional(),
  size: Joi.string().max(20).optional(),
  weight: Joi.string().max(20).optional(),
  stock: Joi.number().integer().min(0).default(0),
  description: Joi.string().max(1000).optional(),
  createdAt: Joi.date().default(() => new Date(), "current date"),
});

module.exports = productValidationSchema;

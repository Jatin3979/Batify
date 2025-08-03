const Joi = require('joi');

const userValidationSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  cart: Joi.array().default([]),
  isadmin: Joi.boolean().optional(),
  orders: Joi.array().default([]),
  contact: Joi.number().required(),
  picure: Joi.string().uri().optional().allow('')
});

module.exports = userValidationSchema;

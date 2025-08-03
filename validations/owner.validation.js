const Joi = require("joi");

const ownerValidationSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  products: Joi.array().default([]),
  contact: Joi.number().required(),
  picure: Joi.string().uri().optional().allow(''),
  gstin: Joi.string().optional().allow('')
});

module.exports = ownerValidationSchema;

const Joi = require('joi');

const productValidationSchema = Joi.object({
  image: Joi.string().uri().required(), // assuming image is a URL
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).default(0),
  bgcolor: Joi.string().optional().allow(''),
  panelcolor: Joi.string().optional().allow(''),
  textcolor: Joi.string().optional().allow('')
});

module.exports = productValidationSchema;

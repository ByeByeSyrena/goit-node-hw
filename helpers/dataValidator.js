const Joi = require("joi");

function dataValidator(data) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ "any.required": "missing required name field" }),
    email: Joi.string()
      .required()
      .messages({ "any.required": "missing required email field" }),
    phone: Joi.string()
      .required()
      .messages({ "any.required": "missing required phone field" }),
  });

  return schema.validate(data);
}

module.exports = dataValidator;

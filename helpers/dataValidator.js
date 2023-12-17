// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require("joi");

function dataValidate(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = dataValidate;

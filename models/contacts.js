// eslint-disable-next-line import/no-extraneous-dependencies
const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const validateBodyContact = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const validateUpdateBodyContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const validateUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  validateBodyContact,
  validateUpdateBodyContact,
  validateUpdateStatus,
};

const Contact = model("contact", contactSchema);

module.exports = { schemas, Contact };

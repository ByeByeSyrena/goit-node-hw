// eslint-disable-next-line import/no-extraneous-dependencies
const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const user = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

const userSchemas = { user };

module.exports = { User, userSchemas };

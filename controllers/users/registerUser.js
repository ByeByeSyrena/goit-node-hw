// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const gravatar = require("gravatar");

const { ctrlWrapper, httpError } = require("../../helpers");

const { User } = require("../../models");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    httpError(409, "Email in use");
    return;
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });
  res
    .status(201)
    .json({ user: { email, subscription: result.subscription, avatarURL } });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };

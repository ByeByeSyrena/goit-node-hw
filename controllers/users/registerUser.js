// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const gravatar = require("gravatar");
const { link } = require("joi");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");

const { PORT } = process.env;

const { ctrlWrapper, httpError, sendEmail } = require("../../helpers");

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
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const emailForVerification = {
    to: email,
    subject: "verification email",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}" target="_blank">Click for the email verification</a>`,
  };

  await sendEmail(emailForVerification);

  res
    .status(201)
    .json({ user: { email, subscription: result.subscription, avatarURL } });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };

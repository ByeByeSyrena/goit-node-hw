// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt");

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { ctrlWrapper, httpError } = require("../../helpers");

const { User } = require("../../models");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    httpError(401, "Email or password is wrong");
  }
  const isEquel = await bcrypt.compare(password, user.password);
  if (!isEquel) {
    httpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const result = await User.findByIdAndUpdate(
    user.id,
    { token },
    { new: true }
  );

  res.json({ token, user: { email, subscription: result.subscription } });
};

module.exports = { loginUser: ctrlWrapper(loginUser) };

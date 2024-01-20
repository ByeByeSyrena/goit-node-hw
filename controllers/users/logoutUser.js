const { ctrlWrapper } = require("../../helpers");

const { User } = require("../../models");

const logoutUser = async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, { token: "" });

  res.sendStatus(204);
};

module.exports = { logoutUser: ctrlWrapper(logoutUser) };

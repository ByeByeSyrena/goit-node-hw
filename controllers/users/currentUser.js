const { ctrlWrapper } = require("../../helpers");

const currentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

module.exports = { currentUser: ctrlWrapper(currentUser) };

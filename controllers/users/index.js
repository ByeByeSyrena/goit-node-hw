const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { logoutUser } = require("./logoutUser");
const { currentUser } = require("./currentUser");
const { updateUserAvatar } = require("./updateUserAvatar");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
};

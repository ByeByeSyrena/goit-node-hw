const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { logoutUser } = require("./logoutUser");
const { currentUser } = require("./currentUser");
const { updateUserAvatar } = require("./updateUserAvatar");
const { verifyByToken } = require("./verifyByToken");
const { resendVerifyLetter } = require("./resendVerifyLetter");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  verifyByToken,
  resendVerifyLetter,
};

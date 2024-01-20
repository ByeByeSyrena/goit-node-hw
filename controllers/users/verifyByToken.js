const { User } = require("../../models");
const { ctrlWrapper, httpError } = require("../../helpers");

async function verifyByToken(req, res) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    httpError(404, "User not found");
  } else {
    await User.findOneAndUpdate(
      { verificationToken },
      { verificationToken: null, verify: true }
    );
    res.json({ message: "Verification successful" });
  }
}

module.exports = { verifyByToken: ctrlWrapper(verifyByToken) };

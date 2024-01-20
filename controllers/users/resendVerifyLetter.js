const { User } = require("../../models");
const { ctrlWrapper, httpError, sendEmail } = require("../../helpers");

const { PORT } = process.env;

async function resendVerifyLetter(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    httpError(404, "User not found");
    return;
  }

  if (user.verify === true) {
    httpError(400, "Verification has already been passed");
    return;
  }

  const { verificationToken } = user;

  const emailForVerification = {
    to: email,
    subject: "verification email",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}" target="_blank">Click for the email verification</a>`,
  };

  await sendEmail(emailForVerification);

  res.json({ message: "Verification email sent" });
}

module.exports = { resendVerifyLetter: ctrlWrapper(resendVerifyLetter) };

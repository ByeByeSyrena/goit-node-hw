const fs = require("fs/promises");
// eslint-disable-next-line import/no-extraneous-dependencies
const Jimp = require("jimp");
const path = require("path");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../public", "avatars");

const { ctrlWrapper, httpError } = require("../../helpers");

const updateUserAvatar = async (req, res) => {
  const { path: tmpPath, originalname } = req.file;
  const { _id } = req.user;

  if (!req.file) {
    httpError(400, "No file attached");
  }
  const image = await Jimp.read(tmpPath);
  await image.resize(250, 250).write(tmpPath);
  const newFile = `${_id + originalname}`;
  const newFilePath = path.join(avatarsDir, newFile);
  await fs.rename(tmpPath, newFilePath);

  const avatarURL = path.join("avatars", newFile);

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  res.json({ avatarURL });
};
module.exports = { updateUserAvatar: ctrlWrapper(updateUserAvatar) };

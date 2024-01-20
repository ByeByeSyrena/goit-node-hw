// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
const path = require("path");

const pathToTmp = path.join(__dirname, "../tmp");

const multerConfig = multer.diskStorage({ destination: pathToTmp });

const upload = multer({ storage: multerConfig });

module.exports = upload;

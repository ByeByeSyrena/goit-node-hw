// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;
const { httpError, ctrlWrapper } = require("../helpers");

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    httpError(401, "Not authorized");
    return;
  }

  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);
  if (!user || !user.token || user.token !== token) {
    httpError(401, "Not authorized");
    return;
  }

  req.user = user;
  next();
};

module.exports = { checkToken: ctrlWrapper(checkToken) };

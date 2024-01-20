const express = require("express");

const { validateFields, checkToken, upload } = require("../middlewares");

const { userSchemas } = require("../models");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  verifyByToken,
  resendVerifyLetter,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", validateFields(userSchemas.user), registerUser);

userRouter.post("/login", validateFields(userSchemas.user), loginUser);

userRouter.post("/logout", checkToken, logoutUser);

userRouter.get("/current", checkToken, currentUser);

userRouter.patch(
  "/avatars",
  checkToken,
  upload.single("avatar"),
  updateUserAvatar
);

userRouter.get("/verify/:verificationToken", verifyByToken);

userRouter.post(
  "/verify",
  validateFields(userSchemas.email),
  resendVerifyLetter
);

module.exports = userRouter;

// "@elasticemail/elasticemail-client";

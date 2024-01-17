const express = require("express");

const { validateFields, checkToken } = require("../middlewares");

const { userSchemas } = require("../models");

const { registerUser, loginUser } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", validateFields(userSchemas.user), registerUser);

userRouter.post("/login", validateFields(userSchemas.user), loginUser);

module.exports = userRouter;

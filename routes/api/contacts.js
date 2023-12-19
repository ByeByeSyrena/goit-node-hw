const express = require("express");

const router = express.Router();

const { validateFields } = require("../../middlewares/middlewares");
const {
  getUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
} = require("../../controllers/controllers");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validateFields, addUser);
router.delete("/:id", removeUser);
router.put("/:id", validateFields, updateUser);

module.exports = router;

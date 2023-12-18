const express = require("express");

const router = express.Router();

const {
  validateContact,
  validateFields,
} = require("../../middlewares/middlewares");
const {
  getUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
} = require("../../controllers/controllers");

router.get("/", getUsers);
router.get("/:id", validateContact, getUser);
router.post("/", validateFields, addUser);
router.delete("/:id", validateContact, removeUser);
router.put("/:id", validateContact, validateFields, updateUser);

module.exports = router;

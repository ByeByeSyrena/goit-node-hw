const express = require("express");

const router = express.Router();

const { validateId, validateFields } = require("../../middlewares/middlewares");
const {
  getUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
} = require("../../controllers/controllers");

router.get("/", getUsers);
router.get("/:id", validateId, getUser);
router.post("/", validateFields, addUser);
router.delete("/:id", validateId, removeUser);
router.put("/:id", validateId, validateFields, updateUser);

module.exports = router;

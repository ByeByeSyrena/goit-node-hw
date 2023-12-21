const express = require("express");

const router = express.Router();

const { validateFields } = require("../../middlewares");

const {
  getAllContacts,
  addOneContact,
  getOneContact,
  deleteContact,
  updateOneContact,
} = require("../../controllers");

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", validateFields, addOneContact);
router.delete("/:id", deleteContact);
router.put("/:id", validateFields, updateOneContact);

module.exports = router;

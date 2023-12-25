const express = require("express");

const router = express.Router();

const { validateFields, isValidId } = require("../../middlewares");
const { schemas } = require("../../models");

const {
  getAllContacts,
  addOneContact,
  getOneContact,
  deleteContact,
  updateOneContact,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);
router.get("/:id", isValidId, getOneContact);
router.post("/", validateFields(schemas.validateBodyContact), addOneContact);
router.delete("/:id", isValidId, deleteContact);
router.put(
  "/:id",
  isValidId,
  validateFields(schemas.validateBodyContact),
  updateOneContact
);

module.exports = router;

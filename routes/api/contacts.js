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
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);
router.get("/:id", isValidId, getOneContact);
router.post("/", validateFields(schemas.validateBodyContact), addOneContact);
router.delete("/:id", isValidId, deleteContact);
router.put(
  "/:id",
  isValidId,
  validateFields(schemas.validateUpdateBodyContact),
  updateOneContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateFields(schemas.validateUpdateStatus),
  updateStatusContact
);

module.exports = router;

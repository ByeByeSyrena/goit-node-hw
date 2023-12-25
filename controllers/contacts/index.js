const { getAllContacts } = require("./getAllContacts");
const { addOneContact } = require("./addOneContact");
const { getOneContact } = require("./getOneContact");
const { deleteContact } = require("./deleteContact");
const { updateOneContact } = require("./updateOneContact");

module.exports = {
  getAllContacts,
  addOneContact,
  getOneContact,
  deleteContact,
  updateOneContact,
};

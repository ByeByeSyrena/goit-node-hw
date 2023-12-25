// const fs = require("fs").promises;
// const crypto = require("crypto");

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

// const { ctrlWrapper, httpError } = require("../helpers");

// const getAllContacts = async (req, res) => {
//   const contacts = await listContacts();
//   res.json({
//     contacts,
//   });
// };

// const addOneContact = async (req, res) => {
//   const { name, email, phone } = req.body;
//   const id = crypto.randomBytes(16).toString("hex");
//   const newContact = {
//     id,
//     name,
//     email,
//     phone,
//   };
//   await addContact(newContact);
//   res.status(201).json({
//     contact: newContact,
//   });
// };

// const getOneContact = async (req, res) => {
//   const { id } = req.params;
//   const contact = await getContactById(id);

//   if (!contact) {
//     httpError(404, "Not found");
//   }

//   res.json({
//     contact,
//   });
// };

// const deleteContact = async (req, res) => {
//   const { id } = await removeContact(req.params.id);

//   if (id) {
//     res.json({
//       message: "Contact deleted",
//     });
//   } else {
//     httpError(404, "Not found");
//   }
// };

// const updateOneContact = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   if (!body) {
//     httpError(400, "Missing fields");
//   }

//   const { contact } = await updateContact(id, body);
//   if (contact) {
//     res.json({
//       contact,
//     });
//   } else {
//     httpError(404, "Not found");
//   }
// };

// module.exports = {
//   getAllContacts: ctrlWrapper(getAllContacts),
//   addOneContact: ctrlWrapper(addOneContact),
//   getOneContact: ctrlWrapper(getOneContact),
//   deleteContact: ctrlWrapper(deleteContact),
//   updateOneContact: ctrlWrapper(updateOneContact),
// };

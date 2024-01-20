const { ctrlWrapper } = require("../../helpers");

const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.find({ owner });
  res.json(contacts);
};

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };

const { ctrlWrapper } = require("../../helpers");

const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json({
    contacts,
  });
};

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };

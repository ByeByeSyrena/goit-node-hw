const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    httpError(404, "Not found");
  }

  res.json(contact);
};

module.exports = { getOneContact: ctrlWrapper(getOneContact) };

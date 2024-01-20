const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOne({ _id: id, owner });

  if (!contact) {
    httpError(404, "Not found");
  }

  res.json(contact);
};

module.exports = { getOneContact: ctrlWrapper(getOneContact) };

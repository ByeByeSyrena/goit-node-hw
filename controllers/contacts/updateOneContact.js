const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const updateOneContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (result) {
    res.json({ contact: result });
  } else {
    httpError(404, "Not found");
  }
};

module.exports = { updateOneContact: ctrlWrapper(updateOneContact) };

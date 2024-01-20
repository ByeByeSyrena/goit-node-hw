const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const updateOneContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  if (result) {
    res.json(result);
  } else {
    httpError(404, "Not found");
  }
};

module.exports = { updateOneContact: ctrlWrapper(updateOneContact) };

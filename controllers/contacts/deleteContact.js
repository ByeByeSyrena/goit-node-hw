const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Contact.findOneAndDelete({ _id: id, owner });

  if (result) {
    res.json({
      message: "Contact deleted",
    });
  } else {
    httpError(404, "Not found");
  }
};

module.exports = { deleteContact: ctrlWrapper(deleteContact) };

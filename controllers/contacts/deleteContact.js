const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { id } = await Contact.findByIdAndDelete(req.params.id);

  if (id) {
    res.json({
      message: "Contact deleted",
    });
  } else {
    httpError(404, "Not found");
  }
};

module.exports = { deleteContact: ctrlWrapper(deleteContact) };

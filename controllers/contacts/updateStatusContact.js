const { ctrlWrapper, httpError } = require("../../helpers");

const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
  if (result) {
    res.json(result);
  } else {
    httpError(404, "Not found");
  }
};

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };

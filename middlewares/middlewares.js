const { updateContact, getContactById } = require("../models/contacts");

const dataValidate = require("../helpers/dataValidator");

exports.validateUser = async (req, res, next) => {
  const { id } = req.params;
  const { contact } = await getContactById(id);

  if (!contact) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  req.contact = contact;

  next();
};

exports.validateFields = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const { error } = dataValidate(body);

  if (error) {
    return res.status(400).json({
      message: `Missing required ${error.details
        .map((detail) => detail.message)
        .join(", ")} field`,
    });
  }

  if (!body) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  const { contact } = await updateContact(id, body);

  req.contact = contact;
  next();
};

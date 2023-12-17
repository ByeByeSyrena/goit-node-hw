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
  const { body } = req.body;

  const { error, schema } = dataValidate(body);

  const { contact } = await updateContact(id, body);

  if (error) {
    return res.status(400).json({
      message: `missing ${body[type]} field`,
    });
  }

  if (!body) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  req.contact = contact;

  next();
};

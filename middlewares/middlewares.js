const { getContactById } = require("../models/contacts");

const dataValidate = require("../helpers/dataValidator");

exports.validateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contact } = await getContactById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    req.contact = contact;

    next();
  } catch (err) {
    console.log(err);
  }
};

exports.validateFields = async (req, res, next) => {
  try {
    const { body } = req;

    const { error } = await dataValidate(body);

    if (error) {
      return res.status(400).json({
        message: `Validation error(s): ${error.details
          .map((detail) => detail.message)
          .join(", ")}`,
      });
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

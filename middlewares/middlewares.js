const dataValidate = require("../helpers/dataValidator");
// const { listContacts } = require("../models/contacts");

// exports.validateId = async (req, res, next) => {
//   try {
//     const { paramId } = req.params;
//     const contacts = await listContacts();
//     const contactId = contacts.find(({ id }) => id === paramId);
//     if (contactId) {
//       res.status(200).json({
//         message: "Contact deleted",
//       });
//     } else {
//       res.status(404).json({
//         message: "Not found",
//       });
//     }

//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };

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

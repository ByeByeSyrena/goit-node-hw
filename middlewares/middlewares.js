const dataValidate = require("../helpers/dataValidator");

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

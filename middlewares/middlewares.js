const { dataValidator, HttpError } = require("../helpers");

const validateFields = async (req, res, next) => {
  try {
    const { body } = req;

    if (Object.keys(req.body).length === 0) {
      throw new HttpError(400, "missing fields");
    }

    const { error } = await dataValidator(body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = validateFields;

const { dataValidator, httpError, ctrlWrapper } = require("../helpers");

const validateFields = async (req, res, next) => {
  const { body } = req;

  if (Object.keys(req.body).length === 0) {
    httpError(400, "missing fields");
  }

  const { error } = await dataValidator(body);

  if (error) {
    httpError(400, error.message);
  }

  next();
};

module.exports = ctrlWrapper(validateFields);

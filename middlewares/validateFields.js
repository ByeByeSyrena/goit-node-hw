const { httpError } = require("../helpers");

const validateFields = (schema) => {
  console.log(schema);
  const fn = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      if (req.method === "PATCH") {
        httpError(400, "missing field favorite");
      } else {
        httpError(400, "missing fields");
      }
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return fn;
};

module.exports = validateFields;

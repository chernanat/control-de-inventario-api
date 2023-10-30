const { validationResult } = require("express-validator");

const errorValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errors: error.array(),
    });
  }
};

module.exports = { errorValidator };

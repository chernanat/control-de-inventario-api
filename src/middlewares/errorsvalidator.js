const { validationResult } = require("express-validator");

const errorValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.log(error.array());
    const errores = error.array();
    errores.forEach((error) => {
      console.log(error.msg);
    });
    return res.status(400).json({
      errors: error.array(),
    });
  }
};

module.exports = { errorValidator };

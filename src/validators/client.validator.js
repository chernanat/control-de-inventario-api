const { check } = require("express-validator");
const { errorValidator } = require("../middlewares/errorsvalidator");

const requestValidate = [
  check("nombre").exists().not().isEmpty(),
  check("apellido").exists().not().isEmpty(),
  (req, res, next) => {
    errorValidator(req,res,next)
  }
]; //campos que vienen del request para el modelo cliente nombre y apellido

module.exports = {requestValidate};

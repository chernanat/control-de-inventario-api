const { check } = require("express-validator");
const { errorValidator } = require("../middlewares/errorsvalidator");

const requestValidate = [
  check("id").exists().notEmpty(),
  check("nombre").exists().not().isEmpty(),
  check("precio").exists().not().isEmpty().isNumeric(),
  check("cantidad").exists().not().isEmpty().isNumeric(),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo product id,nombre, precio, cantidad

const updateValidate = [
  check("id").exists().notEmpty(),
  check("nombre").exists().not().isEmpty(),
  check("precio").exists().not().isEmpty().isNumeric(),
  check("cantidad").exists().not().isEmpty().isNumeric(),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo product id,nombre, precio, cantidad

module.exports = { requestValidate, updateValidate };

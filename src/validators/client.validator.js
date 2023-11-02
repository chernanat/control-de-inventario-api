const { check } = require("express-validator");
const { errorValidator } = require("../middlewares/errorsvalidator");

const requestValidate = [
  check("nombre", "El campo nombre no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  check("apellido", "El campo apellido no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo cliente nombre y apellido

const updateValidate = [
  check("nombre", "El campo nombre no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  check("apellido", "El campo apellido no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo cliente nombre y apellido

module.exports = { requestValidate, updateValidate };

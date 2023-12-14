const { check } = require("express-validator");
const { errorValidator } = require("../middlewares/errorsvalidator");

const requestValidate = [
  check("id", "El Campo Codigo o Id no debe estar Vacio y debe ser Numerico")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("nombre", "El Campo Nombre no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  check("precio", "El Campo Precio no debe estar vacio, debe ser Numerico y mayor a 0!")
    .exists()
    .not()
    .isEmpty()
    .isInt({ min: 0 }),
  check(
    "cantidad",
    "El Campo Cantidad no debe estar vacio, debe ser Numerico y mayor a 0!"
  )
    .exists()
    .not()
    .isEmpty()
    .isInt({ min: 0 }),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo product id,nombre, precio, cantidad

const updateValidate = [
  check("id", "El Campo Codigo o Id no debe estar Vacio y debe ser Numerico")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("nombre", "El Campo Nombre no debe estar vacio!")
    .exists()
    .not()
    .isEmpty(),
  check("precio", "El Campo Precio no debe estar vacio, debe ser Numerico y mayor a 0!")
    .exists()
    .not()
    .isEmpty()
    .isInt({ min: 0 }),
  check(
    "cantidad",
    "El Campo Cantidad no debe estar vacio, debe ser Numerico y mayor a 0!"
  )
    .exists()
    .not()
    .isEmpty()
    .isInt({ min: 0 }),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo product id,nombre, precio, cantidad

module.exports = { requestValidate, updateValidate };

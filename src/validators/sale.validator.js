const { check } = require("express-validator");
const { errorValidator } = require("../middlewares/errorsvalidator");

const requestValidate = [
  check("producto_id").exists().not().isEmpty().isNumeric(),
  check("cliente_id").exists().not().isEmpty().isNumeric(),
  check("cantidad", "El Campo Cantidad no debe estar vacio, debe ser Numerico y mayor a 0!").exists().not().isEmpty().isInt({ min: 0 }),
  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo sale producto_id,cliente_id

const updateValidate = [
  check("producto_id").exists().not().isEmpty().isNumeric(),
  check("cliente_id").exists().not().isEmpty().isNumeric(),
  check("cantidad", "El Campo Cantidad no debe estar vacio, debe ser Numerico y mayor a 0!").exists().not().isEmpty().isInt({ min: 0 }),

  (req, res, next) => {
    errorValidator(req, res, next);
  },
]; //campos que vienen del request para el modelo sale producto_id,cliente_id

module.exports = { requestValidate, updateValidate };

const { Router } = require("express");
const {
  getSale,
  createSale,
  getSales,
  updateSale,
  deleteSale,
  getClientSales,
  getProductSales,
  getSaleClientProduct,
  createBulkSale,
} = require("../controller/sale.controller");

//validador
const {
  requestValidate,
  updateValidate,
} = require("../validators/sale.validator");

const router = Router();

router.get("/getsale/:id", getSale);

router.post("/createsale", requestValidate, createSale);

router.post("/bulksale", createBulkSale);

router.get("/getsales", getSales);

router.put("/updatesale/:id", updateValidate, updateSale);

router.delete("/deletesale/:id", deleteSale);

//relacion
router.get("/sales/client/:id/", getClientSales); // tra las ventas asociadas a un id del cliente
router.get("/sales/product/:id/", getProductSales); //trae las ventas asociadas a un id del producto
router.get("/salesclientproduct", getSaleClientProduct); //trae todas las ventas asociadas a producto y cliente

module.exports = router;

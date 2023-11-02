const { Router } = require("express");
const {
  getSale,
  createSale,
  getSales,
  updateSale,
  deleteSale,
  getClientSales,
  getProductSales,
} = require("../controller/sale.controller");

//validador
const { requestValidate, updateValidate } = require("../validators/sale.validator");

const router = Router();

router.get("/getsale/:id", getSale);

router.post("/createsale", requestValidate, createSale);

router.get("/getsales", getSales);

router.put("/updatesale/:id",updateValidate, updateSale);

router.delete("/deletesale/:id", deleteSale);

//relacion
router.get("/sales/client/:id/", getClientSales);
router.get("/sales/product/:id/", getProductSales);

module.exports = router;

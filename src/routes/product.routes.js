const { Router } = require("express");
const {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

//validators - request
const { requestValidate } = require("../validators/product.validator");

const router = Router();

router.get("/getproduct/:id", getProduct);

router.post("/createproduct", requestValidate, createProduct);

router.get("/getproducts", getProducts);

router.put("/updateproduct/:id", updateProduct);

router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
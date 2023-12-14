const { Router } = require("express");
const {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  incrementProduct,
  decrementProduct,
} = require("../controller/product.controller");

//validators - request
const {
  requestValidate,
  updateValidate,
} = require("../validators/product.validator");

const router = Router();

router.get("/getproduct/:id", getProduct);

router.post("/createproduct", requestValidate, createProduct);

router.get("/getproducts", getProducts);

router.put("/updateproduct/:id", updateValidate, updateProduct);

router.delete("/deleteproduct/:id", deleteProduct);

//incrementar y decrementar productos
router.post("/incrementproduct/:id", incrementProduct);

router.post("/decrementproduct/:id", decrementProduct);

module.exports = router;

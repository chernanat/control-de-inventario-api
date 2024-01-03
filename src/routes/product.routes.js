const { Router } = require("express");
const multer = require("multer");
const path = require("path");

// Obtén la ruta del directorio del script actual
const scriptDirectory = path.dirname(require.main.filename);
// Construye la ruta absoluta al directorio 'uploads'
const uploadPath = path.join(scriptDirectory, "uploads/product");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const MIMETYPE = (file?.mimetype).split("/");
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + MIMETYPE[1];
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

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

router.post("/createproduct", upload.single("imagen"), requestValidate, createProduct);

router.get("/getproducts", getProducts);

router.put("/updateproduct/:id", updateValidate, updateProduct);

router.delete("/deleteproduct/:id", deleteProduct);

//incrementar y decrementar productos
router.post("/incrementproduct/:id", incrementProduct);

router.post("/decrementproduct/:id", decrementProduct);

module.exports = router;

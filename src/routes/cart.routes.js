const { Router } = require("express");
const {
  getShop,
  addShop,
  deleteShop,
  updateShop,
  deleteShops,
  incrementShop,
  decrementShop,
} = require("../controller/cart.controller");

//validador
// const {
//   requestValidate,
//   updateValidate,
// } = require("../validators/cart.validator");

const router = Router();

router.post("/incrementshop", incrementShop);

router.post("/decrementshop", decrementShop);

router.get("/getshops", getShop);

router.put("/updateshop/:id", updateShop);

router.delete("/deleteshop/:id", deleteShop);

router.delete("/deleteshops", deleteShops);

module.exports = router;

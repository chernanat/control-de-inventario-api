const { Router } = require("express");
const { getSale, createSale, getSales, updateSale, deleteSale, getClientSales, getProductSales  } = require("../controller/sale.controller");

const router = Router();

router.get('/getsale/:id', getSale);

router.post('/createsale', createSale);

router.get('/getsales', getSales);

router.put('/updatesale/:id', updateSale)

router.delete('/deletesale/:id', deleteSale)


//relacion
router.get('/sales/client/:id/', getClientSales);
router.get('/sales/product/:id/', getProductSales);


module.exports = router;
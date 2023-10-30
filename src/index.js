const express = require("express");
const morgan  = require('morgan');
const cors = require('cors')
const app = express();
const clientRoutes = require('./routes/client.routes')
const productRoutes = require('./routes/product.routes')
const saleRoutes = require('./routes/sale.routes')

//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
//rutas
app.use('/api', clientRoutes)
app.use('/api', productRoutes)
app.use('/api', saleRoutes)




module.exports = app;
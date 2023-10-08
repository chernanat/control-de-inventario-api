const express = require("express");
const morgan  = require('morgan');
const cors = require('cors')
const app = express();
const userRoutes = require('./routes/user.routes')

//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
//rutas
app.use(userRoutes)


module.exports = app;
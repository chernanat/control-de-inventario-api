const express = require("express");
const morgan  = require('morgan');
const cors = require('cors')
const app = express();



//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
//rutas


module.exports = app;
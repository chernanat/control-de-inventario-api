const express = require("express");
const morgan  = require('morgan');
const cors = require('cors')
const app = express();
const rickandmortyRoutes = require('./routes/rickandmorty.routes')


//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
//rutas

app.use(rickandmortyRoutes)


module.exports = app;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const clientRoutes = require("./routes/client.routes");
const productRoutes = require("./routes/product.routes");
const saleRoutes = require("./routes/sale.routes");
const cartRoutes = require("./routes/cart.routes");

//middlewares
// Configuración de opciones CORS
const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza esto con el origen correcto de tu aplicación frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Uso de CORS con las opciones configuradas
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
//rutas
app.use("/api", clientRoutes);
app.use("/api", productRoutes);
app.use("/api", saleRoutes);
app.use("/api", cartRoutes);

module.exports = app;

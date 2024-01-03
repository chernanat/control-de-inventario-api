const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const clientRoutes = require("./routes/client.routes");
const productRoutes = require("./routes/product.routes");
const saleRoutes = require("./routes/sale.routes");
const cartRoutes = require("./routes/cart.routes");
const path = require("path");

// Obtén la ruta del directorio del script actual
const scriptDirectory = path.dirname(require.main.filename);
// Construye la ruta absoluta al directorio 'uploads'
const uploadPath = path.join(scriptDirectory, "uploads/product");

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
app.use("/uploads", express.static(path.join(__dirname, "uploads/product")));
console.log(uploadPath);
//rutas
app.use("/api", clientRoutes);
app.use("/api", productRoutes);
app.use("/api", saleRoutes);
app.use("/api", cartRoutes);

module.exports = app;

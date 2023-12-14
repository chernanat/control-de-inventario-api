const { config } = require("dotenv");

config();

PORT = process.env.PORT || 3000;
HOST = process.env.HOST || "";
DB_PORT = process.env.DB_PORT || 5432;
DB_USER = process.env.DB_USER || "postgres";
DB_PASSWORD = process.env.DB_PASSWORD || "carlos123";
DB_NAME = process.env.DB_NAME || "prueba";
DB_HOST = process.env.DB_HOST || "localhost";



module.exports = {
  PORT,
  HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT
};

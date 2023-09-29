const { config } = require("dotenv");

config();

PORT = process.env.PORT || 3000;
HOST = process.env.HOST || "";
DB_PORT = process.env.HOST || "";
DB_USER = process.env.HOST || "";
DB_PASSWORD = process.env.HOST || "";
DB_NAME = process.env.HOST || "";

module.exports = {
  PORT,
  HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};

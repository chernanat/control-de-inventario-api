const { INTEGER, STRING, BLOB } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("product", {
  id: {
    primaryKey: true,
    type: INTEGER,
    allowNull: false,
  },
  nombre: {
    type: STRING,
    allowNull: false,
  },
  precio: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  cantidad: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  imagen: {
    type: STRING,
    allowNull: true,
    defaultValue: "",
  },
});

module.exports = Product;
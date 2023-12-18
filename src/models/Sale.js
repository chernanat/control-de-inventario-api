const { INTEGER } = require("sequelize");
const sequelize = require("../db");
const Client = require("./Client");
const Product = require("./Product");

const Sale = sequelize.define("sale", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  },
  cantidad: {
    type: INTEGER,
    allowNull: true,
  },
  producto_id: {
    type: INTEGER,
    allowNull: false,
  },
  cliente_id: {
    type: INTEGER,
    allowNull: true,
    defaultValue: null,
  },
});

Sale.beforeCreate((sale) => {
  // Manipular la fecha antes de crear el registro
  sale.createdAt = new Date().toLocaleString();
});

Sale.beforeUpdate((sale) => {
  // Manipular la fecha antes de actualizar el registro
  sale.createdAt = new Date().toLocaleString();
});

Sale.belongsTo(Client, {
  foreignKey: "cliente_id",
  as: "cliente",
});

Sale.belongsTo(Product, {
  foreignKey: "producto_id",
  as: "producto",
});

Product.hasMany(Sale, {
  foreignKey: "producto_id",
  sourceKey: "id",
});

Client.hasMany(Sale, {
  foreignKey: "cliente_id",
  sourceKey: "id",
});

module.exports = Sale;

const { INTEGER } = require("sequelize");
const sequelize = require("../db");
const Product = require("./Product");

const Cart = sequelize.define("cart", {
  id_compra: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  cantidad: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  producto_id: {
    type: INTEGER,
    allowNull: false,
  }
});

Cart.belongsTo(Product, {
  foreignKey: "producto_id",
  as: "producto",
});

Product.hasMany(Cart, {
  foreignKey: "producto_id",
  sourceKey: "id",
});


module.exports = Cart;

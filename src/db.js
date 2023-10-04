const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pruebas", "postgres", "carlos123", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

const { INTEGER, STRING } = require("sequelize");
const sequelize = require("../db");

const Client = sequelize.define("client", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  },
  nombre: {
    type: STRING(150),
    defaultValue: "NO APLICA",
  },
  apellido: {
    type: STRING(150),
    defaultValue: "NO APLICA",
  },
});

module.exports = Client;

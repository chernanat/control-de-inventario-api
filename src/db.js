const { Sequelize } = require("sequelize");

//PARAMETROS DE CONFIGURACION DE BASE DE DATOS - (nombre base de datos, motor de base de datos, password, host)
const sequelize = new Sequelize("prueba", "postgres", "carlos123", {
  host: "localhost",
  dialect: 'postgres',
});

module.exports = sequelize;

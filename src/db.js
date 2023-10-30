const { Sequelize } = require("sequelize");
const {DB_NAME, DB_PASSWORD, DB_HOST} = require('./config')
//PARAMETROS DE CONFIGURACION DE BASE DE DATOS - (nombre base de datos, motor de base de datos, password, host)
const sequelize = new Sequelize('prueba', 'postgres', 'carlos123', { //para dockerizar es necesario cambiar los parametros y que coincidan con 
  //los del archivo docker-compose.yml
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;

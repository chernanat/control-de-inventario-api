const { Sequelize } = require("sequelize");
const {DB_NAME, DB_PASSWORD, DB_HOST} = require('./config')
//PARAMETROS DE CONFIGURACION DE BASE DE DATOS - (nombre base de datos, motor de base de datos, password, host)
const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, { //para dockerizar es necesario cambiar los parametros y que coincidan con 
  //los del archivo docker-compose.yml
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;

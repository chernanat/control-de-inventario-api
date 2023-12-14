const { Sequelize } = require("sequelize");
const { DB_NAME, DB_PASSWORD, HOST } = require("./config");

const sequelize = new Sequelize("postgres", "postgres", "carlos123", {
  dialect: "postgres",
  port: 5432,
  host: HOST,
});

// const sequelize = new Sequelize('prueba', 'postgres', 'carlos123', { //para dockerizar es necesario cambiar los parametros y que coincidan con
//   //los del archivo docker-compose.yml
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432
// });

module.exports = sequelize;

const app = require("./index");
const { PORT } = require("./config");
const sequelize = require("./db");
//corremos el proyecto y la conexion a la db
const main = async (req,res) => {
  try {
    await sequelize.sync({force:false});
    console.log('connection succesfully!');
    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

main();



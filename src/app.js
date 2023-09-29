const app = require("./index");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

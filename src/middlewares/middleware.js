const baseMiddleware = (req, res, next) => {
  console.log("paso por el middleware y continuo");
  next();
};

module.exports = { baseMiddleware };

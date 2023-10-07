const axios = require("axios");

const rickAndMortyApi = async (req, res) => {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  console.log(response.data.results);
  res.send(response.data.results);
};

module.exports = {
  rickAndMortyApi,
};

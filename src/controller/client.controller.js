const Client = require("../models/Client");
const Sale = require("../models/Sale");

const createClient = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    const newClient = await Client.create({
      nombre,
      apellido,
    });
    console.log(newClient);
    res.status(200).json({
      message: `Client ${nombre} creado exitosamente!`,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByPk(id);
    if (!client)
      return res.status(404).json({
        message: `Cliente no encontrado`,
        code: 404,
      });
    return res.status(200).json(client);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const clientes = await Client.findAll();
    // if(clientes.isEmpty()) return res.status(200).json({message: ``})
    return res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const updateClient = async(req, res) => {
  try {
    const id = req.params.id;
    const {nombre, apellido} = req.body;
    const client = await Client.findByPk(id);
    if(!client) return res.status(404).json({
        message: `Cliente no encontrado!`,
        code: 404
    })
    client.nombre = nombre;
    client.apellido = apellido
    await client.save();
    return res.status(200).json({
        message: `Cliente Actualizado Exitosamente!`,
        code: 200,
        client
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const deleteClient = async(req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByPk(id);
    if(!client) return res.status(404).json({
        message: `Cliente No encontrado`,
        code: 404
    });
    await client.destroy();
    return res.status(200).json({
        message: `Cliente ${client.nombre} Eliminado Exitosamente!`,
        code: 200
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};


module.exports = {
  createClient,
  getClient,
  getClients,
  updateClient,
  deleteClient
};

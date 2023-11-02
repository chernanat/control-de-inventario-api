const Client = require("../models/Client");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const createSale = async (req, res) => {
  try {
    const { producto_id, cliente_id } = req.body;
    const client_exists = await Client.findOne({
      where: (id = cliente_id),
    });
    const product_exists = await Product.findOne({
      where: (id = producto_id),
    });
    if (!client_exists || !product_exists) {
      return res
        .status(404)
        .json(["Debe Existir Un Cliente y un Producto para crear la venta!"]);
    }
    const newSale = await Sale.create({
      producto_id,
      cliente_id,
    });
    console.log(newSale);
    res.status(200).json({
      message: `Venta ${newSale.id} creado exitosamente!`,
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

const getSale = async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await Sale.findByPk(id);
    if (!sale)
      return res.status(404).json({
        message: `Venta no encontrada`,
        code: 404,
      });
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getSales = async (req, res) => {
  try {
    const ventas = await Sale.findAll();
    return res.status(200).json(ventas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const id = req.params.id;
    const { producto_id, cliente_id } = req.body;
    const sale = await Sale.findByPk(id);
    if (!sale)
      return res.status(404).json({
        message: `Venta no encontrada!`,
        code: 404,
      });
    sale.producto_id = producto_id;
    sale.cliente_id = cliente_id;

    await sale.save();
    return res.status(200).json({
      message: `Venta Actualizada Exitosamente!`,
      code: 200,
      client,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await Sale.findByPk(id);
    if (!sale)
      return res.status(404).json({
        message: `Venta No encontrada`,
        code: 404,
      });
    await sale.destroy();
    return res.status(200).json({
      message: `Venta #${sale.id} Eliminado Exitosamente!`,
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

//consultas relaciones
//obtener las ventas de un cliente
const getClientSales = async (req, res) => {
  try {
    const id = req.params.id;
    const sales = await Sale.findAll({
      where: { cliente_id: id },
      include: {
        model: Client,
        as: "cliente",
      },
    });
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getProductSales = async (req, res) => {
  try {
    const id = req.params.id;
    const sales = await Sale.findAll({
      where: { cliente_id: id },
      include: {
        model: Product,
        as: "producto",
      },
    });
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  createSale,
  getSale,
  getSales,
  updateSale,
  deleteSale,
  getClientSales,
  getProductSales,
};

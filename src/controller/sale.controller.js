const Client = require("../models/Client");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const sequelize = require("sequelize");

const createSale = async (req, res) => {
  try {
    const { producto_id, cliente_id, cantidad } = req.body;

    const client_exists = await Client.findOne({
      where: (id = parseInt(cliente_id)),
    });
    const product_exists = await Product.findOne({
      where: (id = parseInt(producto_id)),
    });
    if (!client_exists || !product_exists) {
      return res
        .status(404)
        .json(["Debe Existir Un Cliente y un Producto para crear la venta!"]);
    }
    if (cantidad <= 0) {
      return res.status(400).json(["Error, la cantidad debe ser mayor a 0"]);
    }
    console.log(product_exists);

    if (product_exists.dataValues.cantidad < cantidad) {
      return res
        .status(400)
        .json([
          `No se puede realizar la venta, hay ${product_exists.dataValues.cantidad} productos Disponibles!`,
        ]);
    }
    const newAmount = product_exists.dataValues.cantidad - cantidad;
    const productUpdated = await Product.update(
      { cantidad: newAmount },
      { where: { id: parseInt(producto_id) } }
    );
    console.log(productUpdated);
    const newSale = await Sale.create({
      producto_id,
      cliente_id,
      cantidad,
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

const createBulkSale = async (req, res) => {
  try {
    const { client_id, shops } = req.body;
    const products = req.body;
    // De esta manera se quita el campo producto
    const shopsWithoutProduct = shops.map((item) => {
      const { producto, createdAt, updatedAt, ...itemWithoutProduct } = item;

      // Agregar client_id al objeto si existe
      if (client_id != null) {
        itemWithoutProduct.cliente_id = client_id;
      }
      return itemWithoutProduct;
    });

    //esta parte recorre los articulos del carrito y verifica su disponibilidad
    //y actualiza los productos en su disponibilidad y guarda la venta.
    const productUpdatePromises = shopsWithoutProduct.map(async (shop) => {
      const cantidad = shop.cantidad;
      const productId = shop.producto_id;
      const product_available = await Product.findOne({
        where: { id: parseInt(productId) },
      });

      if (product_available.dataValues.cantidad < cantidad) {
        throw new Error([
          `No se puede realizar la venta, hay ${product_available.dataValues.cantidad} productos disponibles!`,
        ]);
      }

      const newAmount = product_available.dataValues.cantidad - cantidad;
      return Product.update(
        { cantidad: newAmount },
        { where: { id: parseInt(productId) } }
      );
    });

    // Esperar a que todas las actualizaciones de productos se completen
    await Promise.all(productUpdatePromises);

    const shopsBulk = await Sale.bulkCreate(shopsWithoutProduct);

    return res.status(200).json({
      message: `VENTA EXITOSA!`,
      code: 200,
      shops: shopsBulk,
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
    const ventas = await Sale.findAll({
      attributes: [
        [
          sequelize.fn('date_trunc', 'day', sequelize.cast(sequelize.col('createdAt'), 'timestamp')),
          'createdAt'
        ],
        [sequelize.fn('SUM', sequelize.cast(sequelize.col('cantidad'), 'integer')), 'cantidad'],
      ],
      group: [sequelize.fn('date_trunc', 'day', sequelize.cast(sequelize.col('createdAt'), 'timestamp'))],
      order: [sequelize.fn('date_trunc', 'day', sequelize.cast(sequelize.col('createdAt'), 'timestamp'))],
      
    });

    // Formatear fechas y convertir a timestamp sin zona horaria
    const ventasFormateadas = ventas.map((venta) => ({
      createdAt: (venta.createdAt),
      cantidad: parseInt(venta.cantidad),
    }));

    return res.status(200).json(ventasFormateadas);
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
    const { producto_id, cliente_id, cantidad } = req.body;
    const sale = await Sale.findByPk(id);
    if (!sale)
      return res.status(404).json({
        message: `Venta no encontrada!`,
        code: 404,
      });

    sale.producto_id = producto_id;
    sale.cliente_id = cliente_id;
    sale.cantidad = cantidad;
    if (parseInt(cantidad) === 0) {
      await sale.destroy();
      return res.status(200).json({
        message: `Venta Actualizada Exitosamente!`,
        code: 200,
      });
    }
    //actualizando el stock de los productos al modificar las ventas
    const product = await Product.findByPk(producto_id);
    if (cantidad > sale._previousDataValues.cantidad) {
      const newQuantity = cantidad - sale._previousDataValues.cantidad;
      await product.decrement("cantidad", { by: newQuantity });
    } else if (cantidad < sale._previousDataValues.cantidad) {
      const newQuantity = sale._previousDataValues.cantidad - cantidad;
      await product.increment("cantidad", { by: newQuantity });
    }
    await sale.save();
    return res.status(200).json({
      message: `Venta Actualizada Exitosamente!`,
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
      include: { all: true, nested: true },
      order: [["createdAt", "DESC"]], // Cambiado a DESC para ordenar de forma descendente
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

const getSaleClientProduct = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: { all: true, nested: true },
      order: ["cliente_id"],
    });
    console.log(sales);
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  createSale,
  createBulkSale,
  getSale,
  getSales,
  updateSale,
  deleteSale,
  getClientSales,
  getProductSales,
  getSaleClientProduct,
};

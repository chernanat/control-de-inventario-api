const Cart = require("../models/Cart");
const Product = require("../models/Product");

// const addShop = async (req, res) => {
//   try {
//     console.log(req.body.id);
//     const { id } = req.body;
//     const product_exists = await Product.findOne({
//       where: (id = parseInt(id)),
//     });
//     if (cantidad <= 0) {
//       res.status(404).json(["La Cantidad Debe Ser Mayor a 0!"]);
//     }
//     if (!product_exists) {
//       res
//         .status(404)
//         .json(["Debe existir Un Producto para Ser Agreado Al Carrito!"]);
//     }
//     const product_id = product_exists.id;
//     if (product_exists) {
//       const newShop = await Cart.create({
//         product_id,
//         cliente_id,
//         cantidad,
//       });
//       res.status(200).json({
//         message: `Compra agregada exitosamente!`,
//         product: newShop,
//         code: 200,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message,
//       status: 500,
//     });
//   }
// };

const incrementShop = async (req, res) => {
  try {
    const { id } = req.body;
    const productFound = await Product.findByPk(id);
    if (!productFound) {
      res
        .status(404)
        .json(["Debe existir Un Producto para Ser Agreado Al Carrito!"]);
    }
    const product_id = productFound.dataValues.id;
    const product_exists = await Cart.findOne({
      where: { producto_id: product_id },
    });
    if (parseInt(productFound.cantidad) === 0) {
      console.log("holaaaaa");
      await product_exists.destroy();
      return res.status(200).json({
        message: `Venta Actualizada Exitosamente!`,
        code: 200,
      });
    }
    if (!product_exists) {
      const shop = await Cart.create({
        producto_id: product_id,
        cantidad: 1,
      });
      console.log(shop);
      return res.status(200).json({
        message: `Compra agregada exitosamente!`,
        code: 200,
      });
    }
    console.log("agregando 1 +");
    await product_exists.increment("cantidad");
    return res.status(200).json({
      message: `Venta Actualizada Exitosamente!`,
      product: productFound,
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

const decrementShop = async (req, res) => {
  try {
    const { id } = req.body;
    const productFound = await Product.findByPk(id);
    if (!productFound) {
      res
        .status(404)
        .json(["Debe existir Un Producto para Ser Restado del Carrito!"]);
    }
    const product_id = productFound.dataValues.id;
    const product_exists = await Cart.findOne({
      where: { producto_id: product_id },
    });

    if (parseInt(product_exists.cantidad - 1) <= 0) {
      await product_exists.destroy();
      return res.status(200).json({
        message: `Venta Actualizada Exitosamente!`,
        code: 200,
      });
    }
    await product_exists.decrement("cantidad");
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

const getShop = async (req, res) => {
  try {
    const shops = await Cart.findAll({
      include: {
        model: Product,
        as: "producto",
      },
      order: [["producto", "nombre"]],
    });
    return res.status(200).json(shops);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const updateShop = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, apellido } = req.body;
    const shop = await Cart.findByPk(id);
    if (!shop)
      return res.status(404).json({
        message: `Compra no encontrada!`,
        code: 404,
      });
    shop.nombre = nombre;
    shop.apellido = apellido;
    await shop.save();
    return res.status(200).json({
      message: `Compra Actualizada Exitosamente!`,
      code: 200,
      shop,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const deleteShop = async (req, res) => {
  try {
    const id = req.params.id;
    const shop = await Cart.findByPk(id);
    if (!shop)
      return res.status(404).json({
        message: `Compra No encontrada`,
        code: 404,
      });
    await shop.destroy();
    return res.status(200).json({
      message: `Compra ${shop.id} Eliminada Exitosamente!`,
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

//vaciar el carrito de compras
const deleteShops = async (req, res) => {
  try {
    await Cart.destroy({
      where: {},
      truncate: true, // Esto eliminará todas las filas en la tabla
    });
    return res.status(200).json({
      message: `Carrito Vaciado Exitosamente!`,
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

module.exports = {
  // addShop,
  getShop,
  updateShop,
  deleteShop,
  deleteShops,
  incrementShop,
  decrementShop,
};

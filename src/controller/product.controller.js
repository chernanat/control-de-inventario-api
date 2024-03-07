const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { id, nombre, precio, cantidad } = req.body;

    const duplicatedProduct = await Product.findByPk(id);
    if (duplicatedProduct) {
      const errors = [{ msg: "Codigo existente!" }];
      return res.status(400).json({ errors });
    }

    const image = req.file?.filename;

    const newProduct = await Product.create({
      id,
      nombre,
      precio,
      cantidad,
      imagen: image || "",
    });
    console.log(newProduct);
    res.status(200).json({
      message: `Producto ${nombre} creado exitosamente!`,
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

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({
        message: `Producto no encontrado`,
        code: 404,
      });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const productos = await Product.findAll({
      order: ["createdAt"],
    });
    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio, cantidad } = req.body;
    const producto = await Product.findByPk(id);
    if (!producto)
      return res.status(404).json({
        message: `Producto no encontrado!`,
        code: 404,
      });
    producto.nombre = nombre;
    producto.precio = precio;
    producto.cantidad = cantidad;

    await producto.save();
    return res.status(200).json({
      message: `Producto Actualizado Exitosamente!`,
      code: 200,
      producto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({
        message: `Producto No encontrado`,
        code: 404,
      });
    await product.destroy();
    return res.status(200).json({
      message: `Producto ${product.nombre} Eliminado Exitosamente!`,
      code: 200,
      complete: product
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const incrementProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({
        message: `Producto no encontrado!`,
        code: 404,
      });
    await product.increment("cantidad");
    return res.status(200).json({
      message: `Producto Actualizado Exitosamente!`,
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

const decrementProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({
        message: `Producto no encontrado!`,
        code: 404,
      });
    await product.decrement("cantidad");
    return res.status(200).json({
      message: `Producto Actualizado Exitosamente!`,
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
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  incrementProduct,
  decrementProduct,
};

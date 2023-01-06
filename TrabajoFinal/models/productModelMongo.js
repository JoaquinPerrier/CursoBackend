const { connect } = require("mongoose");
const Producto = require("../schemas/products");
require("dotenv").config();

connectMG = async function () {
  try {
    return await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const db = connectMG();

console.log("CONECTAO CON MONGUITO");
if (!db) throw "can not connect to the db";

let datos;
async function consulta() {
  datos = await Producto.find({});
}

exports.findProductsMongo = async function (req, res) {
  await consulta();
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
    return datos;
  } else {
    if (!datos) return datos;
    const found = datos.find((el) => el.id == id);
    return found;
  }
};

exports.createProductMongo = async function (req, res) {
  const { body } = req;

  await consulta();

  if (
    !body.title ||
    !body.description ||
    !body.price ||
    !body.code ||
    !body.stock ||
    !body.thumbnail
  ) {
    throw new Error("Faltan parametros");
  }

  // ASIGNARLE UN ID AL OBJETO
  const productoNuevo = new Producto({
    title: body.title,
    description: body.description,
    price: Number(body.price),
    code: Number(body.code),
    stock: Number(body.stock),
    thumbnail: body.thumbnail,
    timestamp: Date.now(),
    id: datos[datos.length - 1].id + 1,
  });

  const productoGuardado = await productoNuevo.save();

  return datos;
};

exports.editProductMongo = async function (req, res) {
  const { id } = req.params;
  const { body } = req;

  if (!id || !body) {
    throw new Error("Faltan parametrossss");
  }

  await consulta();

  const productoModificado = await Producto.updateOne(
    { id: id },
    {
      $set: {
        title: body.title,
        description: body.description,
        price: Number(body.price),
        code: Number(body.code),
        stock: Number(body.stock),
        thumbnail: body.thumbnail,
      },
    }
  );

  await consulta();

  return productoModificado;
};

exports.deleteProductMongo = async function (req, res) {
  const { id } = req.params;

  await consulta();

  const productoBorrado = await Producto.deleteOne({ id: id });

  if (!productoBorrado.deletedCount) {
    throw new Error("Error: No se encontro producto a borrar");
  }

  await consulta();
  return datos;
};

exports.findProductForCart = async function (req, res) {
  await consulta();
  const { id_prod } = req.params;

  const found = datos.find((el) => el.id == id_prod);

  // IF FOUND IS EMPTY, WE ADVISE THE USER
  if (found != null) {
    const itemToAdd = {
      title: found.title,
      price: found.price,
      code: found.code,
    };
    return itemToAdd;
  } else {
    return "PRODUCTO NO ENCONTRADO";
  }
};

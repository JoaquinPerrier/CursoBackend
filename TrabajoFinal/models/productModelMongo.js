const { connect } = require("mongoose");
const Producto = require("../schemas/products");
require("dotenv").config();

console.log(process.env.MONGO_URL);

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
consulta();

exports.findProductsMongo = async function (req, res) {
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

  // ASIGNARLE UN ID AL OBJETO
  const productoNuevo = new Producto({
    title: body.title,
    description: body.description,
    price: Number(body.price),
    code: Number(body.code),
    stock: Number(body.stock),
    thumbnail: body.thumbnail,
    timestamp: Date.now(),
    id: datos.length + 1,
  });

  const productoGuardado = await productoNuevo.save();

  consulta();
  return datos;
};

exports.editProductMongo = async function (req, res) {
  const { id } = req.params;
  const { body } = req;

  //console.log(productoToChange);
  // CAMBIAMOS TODO EL PRODUCTO POR EL QUE VIENE DESDE EL FRONT

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

  return datos;
};

exports.deleteProductMongo = async function (req, res) {
  const { id } = req.params;

  const productoBorrado = await Producto.deleteOne({ id: id });

  await consulta();
  return datos;
};

/*exports.findProductForCart = function (req, res) {
  const { id_prod } = req.params;

  const found = arrayCompleto.find((el) => el.id == id_prod);
  // IF FOUND IS EMPTY, WE ADVISE THE USER
  if (found != null) {
    return found;
  } else {
    return "PRODUCTO NO ENCONTRADO";
  }
};*/

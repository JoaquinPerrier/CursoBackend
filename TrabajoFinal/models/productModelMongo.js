const { connect } = require("mongoose");
const Producto = require("../schemas/products");

connectMG = async function () {
  try {
    return await connect("mongodb://localhost:27017/TPecommerce", {
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
  // console.log(datos);
}
consulta();
/*const arrayProductos = async function () {
  await Producto.find({});
};*/

// console.log(datos);

exports.findProductsMongo = async function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
    return datos;
  } else {
    const found = datos.find((el) => el.id == id);
    // IF FOUND IS EMPTY, WE ADVISE THE USER
    if (found != null) {
      return found;
    } else {
      return "PRODUCTO NO ENCONTRADO";
    }
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

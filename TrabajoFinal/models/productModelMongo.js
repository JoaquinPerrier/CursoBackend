const { connect } = require("mongoose");
const { products } = require("../schemas/products");

connectMG = async function () {
  try {
    return await connect("mongodb://localhost:27017/products", {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const db = connectMG();

console.log("CONECTAO CON MONGUITO");
if (!db) throw "can not connect to the db";

const arrayProductos = await products.find({});
console.log(arrayProductos);

exports.findProductsMongo = function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
    return arrayProductos;
  } else {
    const found = arrayProductos.find((el) => el.id == id);
    // IF FOUND IS EMPTY, WE ADVISE THE USER
    if (found != null) {
      return found;
    } else {
      return "PRODUCTO NO ENCONTRADO";
    }
  }
};

/*exports.createProduct = async function (req, res) {
  const { body } = req;
  console.log(req);
  await obtenerProductos();
  // ASIGNARLE UN ID AL OBJETO
  body.price = Number(body.price);
  body.code = Number(body.code);
  body.stock = Number(body.stock);

  body.id = arrayCompleto.length + 1;
  body.timestamp = Date.now();
  console.log(body);

  ingresarNuevoObj(body);
  return body;
  //console.log(arrayCompleto.length);
};

exports.editProduct = function (req, res) {
  const { id } = req.params;
  const { body } = req;
  //console.log(body);

  const productoToChange = arrayCompleto.find((el) => el.id == id);
  //console.log(productoToChange);
  // CAMBIAMOS TODO EL PRODUCTO POR EL QUE VIENE DESDE EL FRONT
  productoToChange.title = body.title;
  productoToChange.description = body.description;
  productoToChange.price = body.price;
  productoToChange.code = body.code;

  let lugarDelObjt = arrayCompleto.findIndex((el) => el.id == id);

  arrayCompleto[lugarDelObjt] = productoToChange;

  productsContainer.modificarObjeto(arrayCompleto);

  return productoToChange;
};

exports.deleteProduct = function (req, res) {
  const { id } = req.params;

  const productsFilteredById = arrayCompleto.filter((item) => item.id != id);
  productsContainer.modificarObjeto(productsFilteredById);
  return productsFilteredById;
};

exports.findProductForCart = function (req, res) {
  const { id_prod } = req.params;

  const found = arrayCompleto.find((el) => el.id == id_prod);
  // IF FOUND IS EMPTY, WE ADVISE THE USER
  if (found != null) {
    return found;
  } else {
    return "PRODUCTO NO ENCONTRADO";
  }
};*/

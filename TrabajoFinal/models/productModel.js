const Contenedor = require("../contenedor");

let productsContainer = new Contenedor("products.txt");

let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await productsContainer.getAll();
};
let ingresarNuevoObj = async (newObj) => {
  await productsContainer.save(newObj);
};

obtenerProductos();

exports.findProducts = function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
    obtenerProductos();
    return arrayCompleto;
  } else {
    const found = arrayCompleto.find((el) => el.id == id);
    // IF FOUND IS EMPTY, WE ADVISE THE USER
    if (found != null) {
      return found;
    } else {
      return "PRODUCTO NO ENCONTRADO";
    }
  }
};

exports.createProduct = async function (req, res) {
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

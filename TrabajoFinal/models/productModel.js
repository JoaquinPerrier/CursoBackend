const Contenedor = require("../contenedor");

let contenedor = new Contenedor("products.txt");
let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await contenedor.getAll();
};
let ingresarNuevoObj = async (newObj) => {
  await contenedor.save(newObj);
};

obtenerProductos();

exports.findProducts = function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
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

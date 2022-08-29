const Contenedor = require("../contenedor");

let shoppingCartContainer = new Contenedor("shoppingCart.txt");

let allShoppingCarts;
let obtenerCarritos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  allShoppingCarts = await shoppingCartContainer.getAll();
};

let ingresarNuevoObj = async (newObj) => {
  await shoppingCartContainer.save(newObj);
};

obtenerCarritos();

exports.findProductsOfCart = function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id != null) {
    obtenerCarritos();

    const found = allShoppingCarts.find((el) => el.id == id);

    console.log(found);
    return found.products;
  }
};

exports.createCart = async function (req, res) {
  await obtenerCarritos();
  // ASIGNARLE UN ID AL OBJETO
  let newCart = { id: 0, timestamp: 0 };

  newCart.id = allShoppingCarts.length + 1;
  newCart.timestamp = Date.now();

  ingresarNuevoObj(newCart);
  return newCart;
  //console.log(arrayCompleto.length);
};

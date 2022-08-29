const Contenedor = require("../contenedor");

let shoppingCartContainer = new Contenedor("shoppingCart.txt");

let allShoppingCarts;
let obtenerCarritos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  allShoppingCarts = await shoppingCartContainer.getAll();
};

obtenerCarritos();

exports.findProducts = function (req, res) {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id != null) {
    obtenerCarritos();

    const found = allShoppingCarts.find((el) => el.id == id);

    console.log(found);
    return found.products;
  }
};

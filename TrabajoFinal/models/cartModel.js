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

  if (id != null) {
    obtenerCarritos();

    const found = allShoppingCarts.find((el) => el.id == id);

    if (found == undefined) {
      return "EL CARRITO NO EXISTE";
    } else {
      return found.products;
    }
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

exports.deleteCart = async function (req, res) {
  const { id } = req.params;
  console.log(allShoppingCarts);
  const cartsFilteredById = allShoppingCarts.filter((item) => item.id != id);
  shoppingCartContainer.modificarObjeto(cartsFilteredById);
  return cartsFilteredById;
};

exports.addProductToCart = async function (req, res, productToAdd) {
  const { id } = req.params;

  await obtenerCarritos();

  const found = allShoppingCarts.find((el) => el.id == id);
  if (found != undefined) {
    found.products.push(productToAdd);

    let lugarDelObjt = allShoppingCarts.findIndex((el) => el.id == id);
    allShoppingCarts[lugarDelObjt] = found;
    shoppingCartContainer.modificarObjeto(allShoppingCarts);

    return found;
  } else {
    return "ERROR. PRODUCTO NO ENCONTRADO";
  }
};

exports.deleteProductFromCart = async function (req, res, productToAdd) {
  const { id, id_prod } = req.params;

  await obtenerCarritos();

  // WE SEARCH FOR THE SHOPPING CART TO EDIT
  const shoppingCartFound = allShoppingCarts.find((el) => el.id == id);

  if (shoppingCartFound != undefined) {
    // WE UPDATE THE PRODUCTS OF THE SHOPPING CART FOUND
    const productsToUpdate = shoppingCartFound.products.filter(
      (item) => item.id != id_prod
    );
    shoppingCartFound.products = productsToUpdate;

    // WE UPDATE THE ARRAY OF THE SHOPPINGS CARTS
    let lugarDelObjt = allShoppingCarts.findIndex((el) => el.id == id);

    allShoppingCarts[lugarDelObjt] = shoppingCartFound;

    shoppingCartContainer.modificarObjeto(allShoppingCarts);

    return shoppingCartFound;
  } else {
    return "ERROR. CARRITO NO EXISTE";
  }
};

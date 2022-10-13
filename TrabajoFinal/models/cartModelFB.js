const admin = require("firebase-admin");
const FieldValue = require("firebase-admin").firestore.FieldValue;

const serviceAccount = require("../utils/db/tpfinalch-firebase-adminsdk-yh5o9-65ca61ffeb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

let allShoppingCarts;
let obtenerCarritos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  allShoppingCarts = await db.collection("carts").get();
};

obtenerCarritos();

exports.findProductsOfCartFB = async function (req, res) {
  const { id } = req.params;

  const dataFormateada = allShoppingCarts.docs.map((item) => ({
    id: item.id,
    data: item.data(),
  }));

  const carritoEncontrado = dataFormateada.find((el) => el.data.id == id);

  //console.log(dataFormateada);
  // console.log(cartsFilteredById);
  console.log(carritoEncontrado);

  if (carritoEncontrado == undefined) {
    return "EL CARRITO NO EXISTE";
  } else {
    return carritoEncontrado;
  }
};

exports.createCartFB = async function (req, res) {
  let idAUX = 0;

  // ASIGNARLE UN ID AL OBJETO
  let newCart = { id: 0, timestamp: 0, products: [] };

  const dataFormateada = allShoppingCarts.docs.map((item) => ({
    id: item.id,
    data: item.data(),
  }));

  // BUSCAR EL ID MAS ALTO
  dataFormateada.forEach((item) => {
    item.data.id > idAUX ? (idAUX = item.data.id) : item.data.id;
  });

  console.log(`ID AUX ANTES DE AGREGARLO AL OBJ ${idAUX}`);
  // ASIGNAMOS EL OBJETITO
  newCart.timestamp = Date.now();
  newCart.id = idAUX + 1;

  await db.collection("carts").doc().set(newCart);
  await obtenerCarritos();

  return newCart;
};

exports.deleteCartFB = async function (req, res) {
  const { id } = req.params;
  let fb_id = 0;

  const dataFormateada = allShoppingCarts.docs.map((item) => ({
    id: item.id,
    data: item.data(),
  }));

  // BUSCAR EL ID A ELIMINAR
  dataFormateada.forEach((item) => {
    item.data.id == id ? (fb_id = item.id) : item.data.id;
  });

  if (fb_id == 0) {
    return "NO EXISTE UN CARRITO CON ESA ID";
  }

  await db.collection("carts").doc(fb_id).delete();

  await obtenerCarritos();

  return fb_id;
};

exports.addProductToCartFB = async function (req, res, productToAdd) {
  const { id } = req.params;
  let fb_id = 0;

  const dataFormateada = allShoppingCarts.docs.map((item) => ({
    id: item.id,
    data: item.data(),
  }));

  // BUSCAR EL ID DEL CARRITO A AGREGARLE EL PROD
  dataFormateada.forEach((item) => {
    item.data.id == id ? (fb_id = item.id) : item.data.id;
  });

  if (fb_id == 0) {
    return "NO EXISTE UN CARRITO CON ESA ID";
  }

  await db
    .collection("carts")
    .doc(fb_id)
    .update({
      products: FieldValue.arrayUnion(productToAdd),
    });

  await obtenerCarritos();

  return fb_id;
};

exports.deleteProductFromCartFB = async function (req, res, productToAdd) {
  const { id, id_prod } = req.params;
  let fb_id = 0;

  const dataFormateada = allShoppingCarts.docs.map((item) => ({
    id: item.id,
    data: item.data(),
  }));

  // BUSCAR EL ID DEL CARRITO A AGREGARLE EL PROD
  dataFormateada.forEach((item) => {
    item.data.id == id ? (fb_id = item.id) : item.data.id;
  });

  if (fb_id == 0) {
    return "NO EXISTE UN CARRITO CON ESA ID";
  }

  await db
    .collection("carts")
    .doc(fb_id)
    .update({
      "products.id": FieldValue.arrayRemove(id_prod),
    });
  await obtenerCarritos();

  return fb_id;
};

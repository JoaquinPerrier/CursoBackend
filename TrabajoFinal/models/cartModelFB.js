const admin = require("firebase-admin");

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

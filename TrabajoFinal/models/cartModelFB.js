const admin = require("firebase-admin");

const serviceAccount = require("../utils/db/tpfinalch-firebase-adminsdk-yh5o9-65ca61ffeb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.findProductsOfCartFB = async function (req, res) {
  const { id } = req.params;

  const data = await db.collection("carts").get();

  const dataFormateada = data.docs.map((item) => ({
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

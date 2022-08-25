const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;
const ISADMIN = true;
const Contenedor = require("./contenedor");

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

// CONFIGURATION
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + "/public"));

app.use("/api/", router);

// ROUTES OF PRODUCTS
router.get("/products/:id?", (req, res) => {
  const { id } = req.params;

  // IF THERE IS NOT AN ID, WE RETURN THE FULL LIST
  if (id == null) {
    res.send(arrayCompleto);
  } else {
    const found = arrayCompleto.find((el) => el.id == id);
    // IF FOUND IS EMPTY, WE ADVISE THE USER
    if (found != null) {
      res.send(found);
    } else {
      res.send("THE PRODUCT DOESN'T EXIST");
    }
  }
});

router.post(
  "/products",
  async (req, res, next) => {
    if (ISADMIN == false) {
      res.send("NO POSEE PERMISOS");
    }
    next();
  },
  async (req, res, next) => {
    await obtenerProductos();
    next();
  },
  async (req, res) => {
    const { body } = req;
    console.log(req);
    // ASIGNARLE UN ID AL OBJETO
    body.price = Number(body.price);
    body.code = Number(body.code);
    body.stock = Number(body.stock);

    body.id = arrayCompleto.length + 1;
    body.timestamp = Date.now();
    console.log(body);

    ingresarNuevoObj(body);
    res.redirect("/public/index.html");
    //console.log(arrayCompleto.length);
  }
);

// ROUTES OF SHOPPING CART
router.get("/carrito", (req, res) => {
  res.send("SEND SHOPPING CART");
});

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

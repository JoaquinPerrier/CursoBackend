const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;
const ISADMIN = false;
const productController = require("./controllers/productController");

// CONFIGURATION
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + "/public"));

app.use("/api/", router);

//////////////////////////
// ROUTES OF PRODUCTS
//////////////////////////
router.get("/products/:id?", (req, res) => {
  productController.product_list(req, res);
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

router.put(
  "/products/:id",
  async (req, res, next) => {
    if (ISADMIN == false) {
      res.send("NO POSEE PERMISOS");
    }
    next();
  },
  (req, res) => {
    const { id } = req.params;
    const { body } = req;

    console.log(body);

    const productoToChange = arrayCompleto.find((el) => el.id == id);
    console.log(productoToChange);
    // CAMBIAMOS TODO EL PRODUCTO POR EL QUE VIENE DESDE EL FRONT
    productoToChange.title = body.title;
    productoToChange.description = body.description;
    productoToChange.price = body.price;
    productoToChange.code = body.code;

    let lugarDelObjt = arrayCompleto.findIndex((el) => el.id == id);

    arrayCompleto[lugarDelObjt] = productoToChange;

    contenedor.modificarObjeto(arrayCompleto);

    res.send("PRODUCTO CAMBIADO");
  }
);

router.delete(
  "/products/:id",
  async (req, res, next) => {
    if (ISADMIN == false) {
      res.send("NO POSEE PERMISOS");
    }
    next();
  },
  (req, res) => {
    const { id } = req.params;
    const productsFilteredById = arrayCompleto.filter((item) => item.id != id);
    contenedor.modificarObjeto(productsFilteredById);
    res.send("OBJETO ELIMINADO");
  }
);

//////////////////////////
// ROUTES OF SHOPPING CART
//////////////////////////
router.get("/carrito", (req, res) => {
  res.send("SEND SHOPPING CART");
});

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

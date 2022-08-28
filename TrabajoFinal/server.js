const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;
const ISADMIN = true;
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
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send("NO POSEE PERMISOS");
    }
    next();
  },
  (req, res) => {
    productController.create_product(req, res);
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
    productController.edit_product(req, res);
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
    productController.delete_product(req, res);
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

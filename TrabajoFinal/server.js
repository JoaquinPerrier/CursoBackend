const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;
const ISADMIN = true;
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");

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
      res.send({
        error: -1,
        desc: `route /api/products with POST isn´t auth`,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    productController.create_product(req, res);
  }
);

router.put(
  "/products/:id",
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send({
        error: -1,
        desc: `route /api/products with PUT isn´t auth`,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    productController.edit_product(req, res);
  }
);

router.delete(
  "/products/:id",
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send({
        error: -1,
        desc: `route /api/products with DELETE isn´t auth`,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    productController.delete_product(req, res);
  }
);

//////////////////////////
// ROUTES OF SHOPPING CART
//////////////////////////
router.post("/carrito", (req, res) => {
  cartController.create_cart(req, res);
});

router.delete("/carrito/:id", (req, res) => {
  cartController.delete_cart(req, res);
});

router.get("/carrito/:id/products", (req, res) => {
  cartController.cart_list(req, res);
});

router.post("/carrito/:id/products/:id_prod", async (req, res) => {
  // SEARCH FOR THE PRODUCT TO ADD
  let productToAdd = await productController.find_product_for_cart(req, res);

  // ADDING THE PRODUCT TO THE SHOPPING CART
  cartController.add_product_to_cart(req, res, productToAdd);
});

router.delete("/carrito/:id/products/:id_prod", async (req, res) => {
  cartController.delete_product_from_cart(req, res);
});

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

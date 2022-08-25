const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;

// CONFIGURATION
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/", router);

// ROUTES OF PRODUCTS
router.get("/products", (req, res) => {
  res.send("Get for products");
});

// ROUTES OF SHOPPING CART
router.get("/carrito", (req, res) => {
  res.send("Get for the shopping cart");
});

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

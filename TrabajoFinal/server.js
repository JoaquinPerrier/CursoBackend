const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
const routerProducts = require("./routesProducts");
const routerShopCart = require("./routesShopCart");

// CONFIGURATION
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/api/", routerProducts);
app.use("/api/", routerShopCart);

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

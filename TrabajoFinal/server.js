const express = require("express");
const app = express();
const PORT = 8080;
const routerProducts = require("./routes/routesProducts");
const routerShopCart = require("./routes/routesShopCart");
const routerUsers = require("./routes/routesUser");

// CONFIGURATION
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + "/public"));
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ROUTES
app.use("/api/", routerProducts);
app.use("/api/", routerShopCart);
app.use("/api/", routerUsers);

// SERVER INFO
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

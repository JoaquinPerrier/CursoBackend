const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const Contenedor = require("../desafioClase3y4");

// METODOS DE CLASE CONTENEDOR
let contenedor = new Contenedor("productos.txt");
let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await contenedor.getAll();
  console.log(__dirname);
};
let ingresarNuevoObj = async (newObj) => {
  await contenedor.save(newObj);
};

obtenerProductos();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

const server = app.listen(8080, () => {
  console.log(`Servidor http iniciado en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

app.get("/", (req, res) => {
  res.render("formCarga");
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  const { title, price, thumbnail } = body;
  const producto = { title, price: parseInt(price), thumbnail };
  await contenedor.save(producto);
  res.redirect("/");
});

app.get("/productos", async (req, res) => {
  if (arrayCompleto.length !== 0) {
    res.render("productslist", { arrayCompleto });
  } else {
    res.render("formCarga");
  }
});

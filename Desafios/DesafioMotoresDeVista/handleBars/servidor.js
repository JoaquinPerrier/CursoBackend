const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const Contenedor = require("./Contenedor");

let contenedor = new Contenedor("productos.txt");
let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await contenedor.getAll();
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
  res.render("formulario");
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  console.log(body);
  // ASIGNARLE UN ID AL OBJETO
  body.id = arrayCompleto.length + 1;

  //console.log(body);
  ingresarNuevoObj(body);
  res.redirect("/");
});

app.get("/productos", async (req, res) => {
  if (arrayCompleto.length !== 0) {
    res.render("listadoProductos", { arrayCompleto });
  } else {
    res.render("sinProductos");
  }
});

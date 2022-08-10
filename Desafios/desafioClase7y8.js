const express = require("express");
const { Router } = express;
const Contenedor = require("./desafioClase3y4");

let contenedor = new Contenedor("productos.txt");
let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await contenedor.getAll();
};
let ingresarNuevoObj = async (newObj) => {
  await contenedor.save(newObj);
};

let modificarObj = async (arrayMod) => {
  await contenedor.save(newObj);
};

obtenerProductos();

const app = express();
const router = Router();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
app.get("/productos", (req, res) => {
  res.json(arrayCompleto);
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;

  const found = arrayCompleto.find((el) => el.id == id);
  console.log(found);
  if (found) {
    res.json(found);
  } else {
    res.send("NO SE ENCONTRO");
  }
});

//POST CON BODY (SIN ID!!)
app.post("/productos", (req, res) => {
  const { body } = req;
  console.log(body);
  // ASIGNARLE UN ID AL OBJETO
  body.id = arrayCompleto.length;

  ingresarNuevoObj(body);
  res.json({ success: "producto agregado", newProduct: body });
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const productoToChange = arrayCompleto.find((el) => el.id == id);
  productoToChange.price = body.price;

  let lugarDelObjt = arrayCompleto.findIndex((el) => el.id == id);

  arrayCompleto[lugarDelObjt] = productoToChange;

  contenedor.modificarObjeto(arrayCompleto);

  res.send("PRECIO CAMBIADO");
});

//DELETE CON ID PARAMS SIEMPRE
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const productsFilteredById = arrayCompleto.filter((item) => item.id != id);
  contenedor.modificarObjeto(productsFilteredById);
  res.send("OBJETO ELIMINADO");
});

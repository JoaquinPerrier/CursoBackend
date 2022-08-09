const express = require("express");
const { Router } = express;
const Contenedor = require("./desafioClase3y4");

let contenedor = new Contenedor("productos.txt");
let arryCompleto, productoEncontrado;
let prob = async function correrPrograma() {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arryCompleto = await contenedor.getAll();
  // DEVUELVE EL CONTENIDO DEL ID BUSCADO
};

prob();

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
app.get("/products", (req, res) => {
  const { query } = req;
  // http://localhost:8080/products?price=varPrecio PARA ENVIARLE UNA QUERY. SI NO, ENVIA TODOS LOS PROD
  console.log(query);
  if (query.price) {
    res.json(productos.filter((el) => el.price == query.price));
  } else {
    res.json(productos);
  }
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const found = productos.find((el) => el.id == id);
  console.log(found);
  if (found) {
    res.json(found);
  } else {
    res.send("NO SE ENCONTRO");
  }
});
/*
//POST CON BODY (SIN ID!!)
app.post("/products", (req, res) => {
  const { body } = req;
  console.log(body);
  // ASIGNARLE UN ID AL OBJETO
  body.id = 108;

  res.json({ success: "ok", newProduct: body });
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const productoToChange = productos.find((el) => el.id == id);
  productoToChange.price = body.price;
  console.log(productoToChange, body);
  res.send("PRECIO CAMBIAO");
});

//DELETE CON ID PARAMS SIEMPRE
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productsFilteredById = productos.filter((item) => item.id != id);
  console.log(productsFilteredById);
  res.json({ success: "ok" });
});
*/

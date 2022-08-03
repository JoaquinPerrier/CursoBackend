const express = require("express");
const app = express();
const Contenedor = require("./desafioClase3y4");

let contenedor = new Contenedor("productos.txt");
let arryCompleto, productoEncontrado;
let prob = async function correrPrograma() {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arryCompleto = await contenedor.getAll();
  // DEVUELVE EL CONTENIDO DEL ID BUSCADO
  let idABuscar = Math.trunc(Math.random() * (6 - 1) + 1);
  productoEncontrado = await contenedor.getById(
    Math.trunc(Math.random() * (6 - 1) + 1)
  );
};

prob();

const PORT = process.env.port || 3000;

// Routes
app.get("/", (req, res) => {
  res.end(contenedor);
});

app.get("/productos", (req, res) => {
  res.send(arryCompleto);
});

app.get("/productoRandom", (req, res) => {
  // SE EJECUTA DE NUEVO LA FUNCION, PARA QUE EL ID SEA RANDOM
  prob();
  res.send(productoEncontrado);
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor con express escuchando en el puerto N° ${server.address().port}`
  );
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

// SERVER CON HTTP

/*const http = require("http");

const server = http.createServer((peticion, respuesta) => {
  respuesta.end("Hola mundo!");
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidor Http escuchado en el puerto numero ${
      connectedServer.address().port
    }`
  );
});*/

// SERVER CON EXPRESS (MÁS SIMPLE, MÁS PIOLITA)
const express = require("express");
const app = express();

// Opcional
const PORT = 8080;

// Routes
app.get("/", (req, res) => {
  res.send({ mensaje: "Hola mundo por express" });
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor con express escuchando en el puerto N° ${server.address().port}`
  );
});

// Manejo de errores: es opcional. Se ve más adelante
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

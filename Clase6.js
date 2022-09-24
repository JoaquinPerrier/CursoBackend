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

const nombres = ["Luis", "Lucia", "Juan", "Augusto", "Ana"];
const apellidos = ["Pieres", "Cacurri", "Bezzola", "Mei", "Alberca"];
const colores = ["ROjo", "Verde", "Azul", "Magenta", "Amarillo"];

const arrayMockeado = [];

for (let i = 0; i <= 10; i++) {
  let element = {
    nombre: nombres[Math.trunc(Math.random() * 5)],
    apellido: apellidos[Math.trunc(Math.random() * 5)],
    color: colores[Math.trunc(Math.random() * 5)],
  };
  arrayMockeado.push(element);
}

// Routes
app.get("/", (req, res) => {
  res.send({ alumnos: arrayMockeado });
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor con express escuchando en el puerto N° ${server.address().port}`
  );
});

// Manejo de errores: es opcional. Se ve más adelante
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

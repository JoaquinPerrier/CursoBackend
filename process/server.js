const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const parseArgs = require("minimist");

const yargs = require("yargs/yargs")(process.argv.slice(2));
const args2 = yargs
  .default({ nombre: "Joaquin", apellido: "Perrier" })
  .alias({ n: "nombre", a: "apellido" }).argv;

const args = parseArgs(process.argv.slice(2));

// Asignandole la bandera guion medio, se asignan los valores a una variable (si el nombre es mas de un caracter, va guion medio doble)
// node server.js -x 10 -y 20 -z 320 -msj pepe hola rey
// node server.js --nombre Joaquin --apellido Perrier
// node server.js -n Roberto

// Console log de minimist:
console.log(args);

// Console log de yargs:
console.log(args2);

// Console log de las variables en .env
console.log(
  `VARIABLES SACADAS DESDE .env: PUERTO = ${process.env.PORT}, SECRETO = ${process.env.SECRETO}`
);

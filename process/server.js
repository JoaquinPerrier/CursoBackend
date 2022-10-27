const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2));

// Asignandole la bandera guion medio, se asignan los valores a una variable
// node server.js -x 10 -y 20 -z 320 hola rey

console.log(args);
console.log(process.argv.slice(2));

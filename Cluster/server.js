const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

// console.log(require('os').cpus());
// console.log(require("os").cpus().length);

//SI NUNCA ABRI UN SERVER ANTES
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
    console.log(`MURIO EL WORKER ${worker.process.pid} died`);
  });
} else {
  /*http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`GOLPE AL ENDPOINT ${process.pid} !`);
      console.log(`GOLPE AL ENDPOINT ${process.pid} !`);
    })
    .listen(8080);
  console.log(`INICIE UN Worker NUEVO ${process.pid}`);*/

  const calculo = () => {
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
      sum += i;
    }
    return sum;
  };
  let visitas = 0;
  const server = http.createServer();
  server.on("request", (req, res) => {
    let { url } = req;
    if (url == "/calcular") {
      const sum = calculo();
      res.end(`La suma es ${sum} y estoy en ${process.pid}`);
    } else if (url == "/") {
      res.end("Ok " + ++visitas + "y estoy en " + process.pid);
    }
  });
  const PORT = 8080;
  server.listen(PORT, (err) => {
    if (err) throw new Error(`Error en servidor: ${err}`);
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });
}

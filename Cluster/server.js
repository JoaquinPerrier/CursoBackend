const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

// console.log(require('os').cpus());
//console.log(require('os').cpus().length);

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
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`GOLPE AL ENDPOINT ${process.pid} !`);
      console.log(`GOLPE AL ENDPOINT ${process.pid} !`);
    })
    .listen(8000);
  console.log(`INICIE UN Worker NUEVO ${process.pid}`);
}

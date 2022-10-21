const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const routes = require("./routes");

const Contenedor = require("./Contenedor");

// SOCKET.IO
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

// CLASE CONTENEDOR
let contenedor = new Contenedor("productos.txt");
let arrayCompleto;
let obtenerProductos = async () => {
  // DEVUELVE TODO EL CONTENIDO DEL ARCHIVO:
  arrayCompleto = await contenedor.getAll();
};
obtenerProductos();

app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// CHAT SOCKET IO
let chat = [
  {
    email: "admin@admin.com",
    message: "welcome",
    date: new Date().toLocaleDateString(),
  },
];

io.on("connection", (socket) => {
  // TO VERIFY NEW CONNECTION (FROM THE FRONT)
  // console.log("new connection");

  // ENVIAMOS A EL USUARIO LA LISTA DE PRODUCTOS QUE TENEMOS
  io.sockets.emit("products", arrayCompleto);

  // ENVIAMOS EL CHAT PARA AGREGARLO A LA VISTA
  io.sockets.emit("chat", chat);

  // AL RECIBIR UN MENSAJE, SE LE AGREGA AL CHAT YA GUARDADO EN EL SV
  socket.on("newMessage", (msg) => {
    chat.push(msg);
    // LE PASAMOS EL CHAT, CON EL MSJ NUEVO
    io.sockets.emit("chat", chat);
  });

  // AL RECIBIR UN NUEVO PRODUCTO, LO ENVIAMOS DE NUEVO AL FRONT
  socket.on("addProduct", (data) => {
    data.id = arrayCompleto[arrayCompleto.length - 1].id + 1;
    arrayCompleto.push(data);
    // LE PASAMOS AL FRONT EL NUEVO LISTADO DE PRODUCTOS
    io.sockets.emit("products", arrayCompleto);
  });
});

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

app.get("/", (req, res) => routes.formulario(req, res));

app.post(
  "/productos",
  async (req, res, next) => {
    await obtenerProductos();
    next();
  },
  (req, res) => routes.ingresarProd(req, res, arrayCompleto)
);

app.get("/productos", routes.mostrarProductos);

//CONEXION AL SERVIDOR
httpServer.listen(8080, () => {
  console.log(`Servidor http iniciado en el puerto `);
});

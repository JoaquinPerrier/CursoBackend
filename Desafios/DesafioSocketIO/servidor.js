const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
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
let ingresarNuevoObj = async (newObj) => {
  await contenedor.save(newObj);
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
  console.log("new connection");

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

app.get("/", (req, res) => {
  res.render("formulario");
});

app.post(
  "/productos",
  async (req, res, next) => {
    await obtenerProductos();
    next();
  },
  async (req, res) => {
    const { body } = req;
    console.log(body);
    // ASIGNARLE UN ID AL OBJETO
    body.id = arrayCompleto.length + 1;

    //console.log(body);
    ingresarNuevoObj(body);
    res.redirect("/");
    console.log(arrayCompleto.length);
  }
);

app.get("/productos", async (req, res) => {
  if (arrayCompleto.length !== 0) {
    res.render("listadoProductos", { root: __dirname + "/public" });
  } else {
    res.render("sinProductos");
  }
});

//CONEXION AL SERVIDOR
httpServer.listen(8080, () => {
  console.log(`Servidor http iniciado en el puerto `);
});

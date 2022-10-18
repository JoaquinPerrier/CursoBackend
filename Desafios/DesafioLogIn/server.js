const express = require("express");
const coockieParser = require("cookie-parser");
const session = require("express-session");
const { engine } = require("express-handlebars");
// CON MONGO
const MongoStore = require("connect-mongo");

const app = express();
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://jperrier:qawsed@cluster0.wumbvqn.mongodb.net/test",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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

//////////////////////////
// SESSIONS
app.get("/login", (req, res) => {
  const { user, pass } = req.query;
  if (user !== "pepe" || pass != "asdasd") {
    return res.send("login failed");
  }
  req.session.user = user;
  req.session.admin = true;
  res.send("Login success!");
});

app.get("/test", (req, res) => {
  console.log(req.session.user);
  console.log(req.session.admin);
  res.send("Estas logeado");
});

function checkAdmin(req, res, next) {
  if (!req.session.admin) res.status(403).send("FALTA AUTORIZACION");
  next();
}

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout exitoso!");
  });
});

app.get("/", async (req, res) => {
  res.render("formLogin");
});

app.post("/home", (req, res) => {
  let { nombre } = req.body;
  console.log(nombre);
  if (!req.session[nombre]) {
    req.session[nombre] = {};
    req.session[nombre].nombre = nombre;
    req.session[nombre].cantidadDeLogins = 1;
  } else {
    req.session[nombre].cantidadDeLogins += 1;
  }

  res.render("home", { nombre });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});

// LEVANDANDO SERVER
app.listen(8080, () => {
  console.log("SV LISTENING ON PORT 8080");
});

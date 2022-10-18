const express = require("express");
const coockieParser = require("cookie-parser");
const session = require("express-session");
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

app.get("/algomuyimportante", checkAdmin, (req, res) => {
  res.send("Reporte de entradas truchas");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout exitoso!");
  });
});

app.get("/root/:name", (req, res) => {
  let { name } = req.params;
  if (!req.session[name]) {
    req.session[name] = {};
    req.session[name].name = name;
    req.session[name].cantidadDeLogins = 1;
  } else {
    req.session[name].cantidadDeLogins += 1;
  }
  res.send(
    `<h1>Te damos la bienvenida ${name}</h1>. Visitaste ${req.session[name].cantidadDeLogins} veces`
  );
});

app.get("/olvidar", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});

app.get("/productos", async (req, res) => {
  if (arrayCompleto.length !== 0) {
    res.render("listadoProductos", { arrayCompleto });
  } else {
    res.render("sinProductos");
  }
});

// LEVANDANDO SERVER
app.listen(8080, () => {
  console.log("SV LISTENING ON PORT 8080");
});

const express = require("express");
const coockieParser = require("cookie-parser");
const session = require("express-session");
// CON FILESTORE, LAS SESSIONES NO SE BORRAN CUANDO SE CAE EL SERVER
//const FileStore = require("session-file-store")(session);
//REDIS
//const redis = require("redis");
/*const client = redis.createClient({
  legacyMode: true,
});
client.connect();
const RedisStore = require("connect-redis")(session);*/
// CON MONGO
const MongoStore = require("connect-mongo");

const app = express();
//app.use(coockieParser("A secret"));
app.use(
  session({
    //store: new RedisStore({  host: "localhost",  port: 6379, ttl: 300,  client, }),
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
// COOKIES
// CREA UNA COOKIE SIN FIRMA
/*.get("/crearcookie", (req, res) => {
  res
    .cookie("logeado", "true")
    .status(400)
    .send("<h1> GUARDAMOS TU COOKIE </h1>");
});*/

// CREA COOKIE CON FIRMA
/*app.get("/crearcookiefirmada", (req, res) => {
  res
    .cookie("nombre", "morchicha", { signed: true, httpOnly: true })
    .status(400)
    .send("<h1> GUARDAMOS TU COOKIE FIRMADITA</h1>");
});*/

// RECUPERA COOKIE
/*app.get("/recuperarcookie", (req, res) => {
  console.log("///////////////////////////////");
  console.log(req.cookies);
  console.log(req.signedCookies);
  return res.send("<h1>mira la consola para ver si hay cookies</h1>");
});*/

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

// LEVANDANDO SERVER
app.listen(8080, () => {
  console.log("SV LISTENING ON PORT 8080");
});

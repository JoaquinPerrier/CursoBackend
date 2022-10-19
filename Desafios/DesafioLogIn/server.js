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
    cookie: { maxAge: 6000 },
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

app.get("/", async (req, res) => {
  res.render("formLogin");
});

app.post("/", (req, res) => {
  try {
    const { username } = req.body;
    req.session.username = username;

    res.render("home", { username });
  } catch (error) {
    return res.status(500).send({ status: "Log In error", body: error });
  }
});

app.get("/home", (req, res) => {
  try {
    if (req.session.username != undefined) {
      res.render("home", { username: req.session.username });
    } else {
      res.render("formLogin");
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: "Get page Log In error", body: error });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout exitoso!");
  });
});

// LEVANDANDO SERVER
app.listen(8080, () => {
  console.log("SV LISTENING ON PORT 8080");
});

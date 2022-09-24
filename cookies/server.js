const express = require("express");
const cookieParser = require("cookie-parser");
const { Router } = express;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("a secret"));

const router = Router();
app.use("/cookies", router);

/* Server Listen */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor Levantado http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));

router.post("/", (req, res) => {
  const { key, value, age } = req.body;
  try {
    if (key && value) {
      if (age) {
        res
          .status(200)
          .cookie(key, value, { maxAge: age })
          .send({ proceso: "ok" });
      } else {
        res.status(200).cookie(key, value).send({ proceso: "ok" });
      }
    } else {
      res.status(200).send({ error: "falta nombre ó valor" });
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/", (req, res) => {
  try {
    res.status(200).send(req.cookies);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.delete("/", (req, res) => {
  const { key } = req.body;
  try {
    if (key) {
      res.status(200).clearCookie(key).send({ proceso: "ok" });
    } else {
      res.status(200).send({ error: "falta nombre" });
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});
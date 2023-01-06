const userModel = require("../models/userModel");
const jwtUtil = require("../utils/jwt");

const expReg =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

exports.login = async function (req, res) {
  try {
    if (!req.body.email && !req.body.password) {
      throw new Error("Faltan parametros");
    }

    const currentUserUid = await userModel.login(
      req.body.email,
      req.body.password
    );
    const currentUser = await userModel.findOne(currentUserUid);
    let payload = {
      ...currentUser[0],
    };

    const token = await jwtUtil.createToken(payload);
    res.send({ message: "Status OK", user: currentUser, token: token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.user_create_post = async function (req, res) {
  try {
    let { name, surname, email, password } = req.body;

    if (name && surname && email && password) {
      if (expReg.test(email)) {
        if (password.length >= 6) {
          const newUser = await userModel.createNewUser(
            name,
            surname,
            email,
            password
          );
          let payload = {
            ...newUser,
          };
          const token = await jwtUtil.createToken(payload);
          res.send({ message: "Status OK", newUser: newUser, token: token });
        } else {
          res
            .status(401)
            .send({ message: "La contraseña debe tener minimo 6 caracteres" });
        }
      } else {
        res.status(401).send({
          message: "Email invalido",
        });
      }
    } else {
      res.status(401).send({ message: "Faltan parametros" });
    }
  } catch (errorMessage) {
    res.status(401).send({ message: "El mail ya esta en uso" });
  }
};

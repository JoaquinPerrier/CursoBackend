const express = require("express");
const { Router } = express;
const routerUsers = Router();

const usersController = require("../controllers/usersController");

routerUsers.post("/login", (req, res) => {
  usersController.login(req, res);
});

routerUsers.post("/users", (_req, res) => {
  usersController.user_create_post(req, res);
});

routerUsers.post("/sendPasswordResetEmail", (req, res) => {
  usersController.resetPassword(_req, res);
});

module.exports = routerUsers;

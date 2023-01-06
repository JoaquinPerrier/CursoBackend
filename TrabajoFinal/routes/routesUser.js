const express = require("express");
const { Router } = express;
const routerUsers = Router();

routerUsers.post("/api/login", (req, res) => {
  usersController.login(req, res);
});

routerUsers.post("/api/users", (_req, res) => {
  usersController.user_create_post(req, res);
});

routerUsers.post("/api/sendPasswordResetEmail", (req, res) => {
  usersController.resetPassword(_req, res);
});

module.exports = routerUsers;

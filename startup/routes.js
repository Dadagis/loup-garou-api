const express = require("express");
const home = require("../routes/home");
const games = require("../routes/games");
const users = require("../routes/users");
const roles = require("../routes/roles");
const auth = require("../routes/auth");
const error = require('../middlewares/error');

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/games", games);
  app.use("/api/users", users);
  app.use("/api/roles", roles);
  app.use("/api/auth", auth);
  app.use(error);
};

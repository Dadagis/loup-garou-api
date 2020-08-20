const express = require("express");
const home = require("../routes/home");
const games = require("../routes/games");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/games", games);
  app.use("/api/users", users);
};

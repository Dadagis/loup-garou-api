const express = require("express");
const home = require("../routes/home");
const games = require("../routes/games");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/games", games);
};

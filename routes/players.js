const auth = require("../middlewares/auth");
const Player = require("../controller/players_controller");
const express = require("express");
const router = express.Router();

router.get("/game/:id", auth, Player.findByGameId);

module.exports = router;
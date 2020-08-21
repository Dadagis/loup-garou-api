const auth = require("../middlewares/auth");
const Game = require("../controller/games_controller");
const express = require("express");
const router = express.Router();

router.get("/:id", auth, Game.findById);
router.post("/", auth, Game.create);
router.put("/:id", auth, Game.update);

module.exports = router;

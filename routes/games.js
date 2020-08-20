const { Game, validateGame } = require("../models/game");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game) {
    res.status(404).send("The game with the given ID was not found !");
  } else {
    res.send(game);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateGame(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }

  const game = new Game({
    name: req.body.name,
    players: req.body.players,
  });

  try {
    const result = await game.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

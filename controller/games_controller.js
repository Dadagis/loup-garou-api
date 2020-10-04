const { Game, validateGame } = require("../models/game");

module.exports = {
  findById: async (req, res) => {
    if (req.params.id.length != 24) {
      return res.status(404).send("The game with the given ID was not found");
    }
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send("The game with the given ID was not found !");
    } else {
      try {
        res.send(game);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  getPlayersById: async (req, res) => {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send("The game with the given ID was not found !");
    } else {
      try {
        res.send(game.players);
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  create: async (req, res) => {
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
      playersNumber: req.body.playersNumber,
      players: req.body.players,
    });

    try {
      const result = await game.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  update: async (req, res) => {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send("The game with the given ID was not found");
      return;
    }
    const { error } = validateGame(req.body);

    if (error) {
      res
        .status(400)
        .send(
          `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
        );
      return;
    }

    game.name = req.body.name;
    game.playersNumber = req.body.playersNumber;
    game.players = req.body.players;
    game.rolesId = req.body.rolesId;
    game.winner = req.body.winner || null;

    try {
      const result = await game.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },
};

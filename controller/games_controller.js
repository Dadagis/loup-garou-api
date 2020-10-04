const { Game, validateGame, attibuteRoles } = require("../models/game");
const { Player } = require("../models/player");

module.exports = {
  /**
 * Return a game with the given id
 */
  findById: async (req, res) => {
    if (req.params.id.length != 24) {
      return res.status(404).send("La partie demandée n'a pas été trouvée.");
    }
    const game = await Game.findById(req.params.id);
    const players = await Player.find( {gameId : req.params.id} ).exec();
    if (!game) {
      res.status(404).send("La partie demandée n'a pas été trouvée.");
    }
    else if (!players) {
      res.status(404).send("Les joueurs de la partie demandée n'ont pas été trouvés.");
    }
    else {
      try {
        game.players = players;
        res.send(game);
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  /**
 * Return players in the game
 */
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

  /**
 * Create a game
 */
  create: async (req, res) => {
    console.log(req.body);
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
    });

    try {
      const gameResult = await game.save();
      console.log("gameResult",gameResult);
      const hote = new Player({
        userId: req.body.hoteId,
        gameId: gameResult._id
      })
      try {
        const hoteResult = await hote.save();
        game.playersId.push(hoteResult._id);
        game.hoteId = hoteResult._id;
        const gameResult = await game.save();
        res.send(gameResult);
      } catch (hoteError) {
        console.log(hoteError.message);
      }
      
    } catch (gameError) {
      console.log(gameError.message);
    }
  },
  /**
 * Update the game
 */
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
    game.playersId = req.body.playersId
    game.rolesId = req.body.rolesId;
    game.winner = req.body.winner || null;

    try {
      const result = await game.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },


/**
 * Join the game
 * 
 */
  joinGame: async (req, res) => {

    const game = await Game.findById(req.params.id);
    console.log(game);
    if (!game) {
      res.status(404).send("La partie n'a pas été trouvé.");
      return;
    }

    const player = new Player({
      userId: req.body.userId,
      gameId: req.params.id
    });

    try {
      const playerResult = await player.save();
      alreadyInGame = false;
      game.playersId.forEach(playerId => {
        if(playerId === playerResult._id){
          alreadyInGame =true;
        }
      });
      if(!alreadyInGame){
        game.playersId.push(playerResult._id);
      }
      const gameResult = await game.save();
      res.send(gameResult);
    } catch (gameError) {
      console.log(gameError.message);
    }

  },


  startGame: async (req, res) => {
    if (req.params.id.length != 24) {
      return res.status(404).send("La partie demandée n'a pas été trouvée.");
    }
    const game = await Game.findById(req.params.id);
    const players = await Player.find( {gameId : req.params.id} ).exec();
    if (!game) {
      res.status(404).send("La partie demandée n'a pas été trouvée.");
    }
    else if (!players) {
      res.status(404).send("Les joueurs de la partie demandée n'ont pas été trouvés.");
    }
    else {
      try {
        if (game.hoteId === req.body.userId) {
          let ready = true;
          for (let index = 0; index < players.length; index++) {
            if(!players[index].ready) {
              ready = false;
              break;
            }
          }
          if(ready){
            attibuteRoles(game);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    
  }
};

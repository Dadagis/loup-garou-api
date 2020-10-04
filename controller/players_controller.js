const { Player } = require("../models/player");

module.exports = {
  findByGameId: async (req, res) => {
    const players = await Player.find( {gameId : req.params.gameId} ).exec();
    if (!players) {
      res.status(404).send("Les joueurs de la partie demandée n'ont pas été trouvés.");
    } else {
      try {
        res.send(players);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};

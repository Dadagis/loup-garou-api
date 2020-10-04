const mongoose = require("mongoose");
const Joi = require("joi");
const { Player } = require("../models/player");
var getRandomInt = require("../utils").getRandomInt;

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    playersNumber: {
      type: Number,
      required: true
    },
    hoteId: {
      type: String,
      required: false,
      minlength: 24,
      maxlength: 24,
    },
    playersId: {
      type: Array,
    },
    rolesId: {
      type: Array,
    },
    winner: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

const validateGame = (game) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    playersNumber: Joi.number().required(),
    hoteId: Joi.string().min(24).max(24),
    playersId: Joi.array(),
    rolesId: Joi.array(),
    winner: Joi.string(),
  });
  return schema.validate(game);
};

const validatePlayerId = (playerId) => {
  const schema = Joi.object({
    playerId: Joi.string().min(24).max(24)
  });
  return schema.validate(playerId);
}

const attibuteRoles = async (game) => {
  const players = await Player.find( {gameId : req.params.gameId} ).exec();
  let randomRoleInt = getRandomInt(game.rolesId.count);
  game.players.forEach(player => {

  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.Game = Game;
exports.validateGame = validateGame;

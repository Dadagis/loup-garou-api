const mongoose = require("mongoose");
const Joi = require("joi");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  players: {
    type: Array,
    required: true,
  },
  winner: {
    type: String,
    default: null,
  },
});

const Game = mongoose.model("Game", gameSchema);

const validateGame = (game) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    players: Joi.array().required(),
    winner: Joi.string(),
  });
  return schema.validate(game);
};

exports.Game = Game;
exports.validateGame = validateGame;

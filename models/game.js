const mongoose = require("mongoose");
const Joi = require("joi");

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
    players: {
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
    playersNumber: Joi.number(),
    players: Joi.array(),
    rolesId: Joi.array(),
    winner: Joi.string(),
  });
  return schema.validate(game);
};

exports.Game = Game;
exports.validateGame = validateGame;

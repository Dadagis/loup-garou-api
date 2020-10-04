const mongoose = require("mongoose");
const Joi = require("joi");

const playerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 24,
      maxlength: 24,
    },
    gameId: {
        type: String,
        required: true,
        minlength: 24,
        maxlength: 24,
    },
    startRoleId: {
        type: String,
        minlength: 24,
        maxlength: 24,
    },
    currentRoleId: {
        type: String,
        minlength: 24,
        maxlength: 24,
    },
    firstChoice: {
        type: String,
        minlength: 24,
        maxlength: 24,
    },
    secondChoice: {
        type: String,
        minlength: 24,
        maxlength: 24,
    },
    thirdChoice: {
        type: String,
        minlength: 24,
        maxlength: 24,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

const validatePlayer = (player) => {
  const schema = Joi.object({
    userId: Joi.string().min(24).max(24).required(),
    gameId: Joi.string().min(24).max(24).required(),
    startRoleId: Joi.string().min(24).max(24),
    currentRoleId: Joi.string().min(24).max(24),
    firstChoice: Joi.string().min(24).max(24),
    secondChoice: Joi.string().min(24).max(24),
    thirdChoice: Joi.string().min(24).max(24),
  });
  return schema.validate(player);
};

exports.Player = Player;
exports.validatePlayer = validatePlayer;

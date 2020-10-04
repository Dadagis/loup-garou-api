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
    ready: {
        type: Boolean,
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
    ready: Joi.bool(),
    startRoleId: Joi.string().min(24).max(24),
    currentRoleId: Joi.string().min(24).max(24),
    firstChoice: Joi.string().min(24).max(24),
    secondChoice: Joi.string().min(24).max(24),
    thirdChoice: Joi.string().min(24).max(24),
  });
  return schema.validate(player);
};

const addRole = async(playerId, roleId) => {
    const player = await Player.findbyId(playerId);
    if (!player) {
        console.log("Le joueur n'a pas été trouvé");
    } else {
    try {
        player.roleId = roleId;
        const playerResult = await player.save();
        console.log("playerResult",playerResult);
    } catch (error) {
        console.log(error.message);
    }
    }
};

exports.Player = Player;
exports.validatePlayer = validatePlayer;
exports.addRole = addRole;

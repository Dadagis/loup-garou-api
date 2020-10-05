const mongoose = require("mongoose");
const Joi = require("joi");
const { addRole } = require("../models/player");
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
    ready: {
      type: Boolean,
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
    ready: Joi.bool(),
    playersId: Joi.array(),
    rolesId: Joi.array(),
    winner: Joi.string(),
  });
  return schema.validate(game);
};

const attibuteRoles = async (game) => {
  //Initialise le tableau des roles attribués
  let attributedRoles = [];
  games.rolesId.forEach(() => {
    attributedRoles.push(0);
  });
  //attribution des roles à tous les joueurs
  game.playersId.forEach(playerId => {
    let roleAttribution = false;
    const roleCount = game.rolesId.count;
    //Tant qu'un rôle n'a pas été attribué au joueur
    while (!roleAttribution) {
      let randomRoleInt = getRandomInt(roleCount);
      //Si le rôle n'a pas été attribué
      if (!attributedRoles[randomRoleInt]) {
        attributedRoles[randomRoleInt] = true;
        addRole(playerId, games.rolesId[randomRoleInt]);
        roleAttribution = true;
      }
    }
  });
  const executeGame = async (game) => {

  }
}

exports.Game = Game;
exports.validateGame = validateGame;
exports.attibuteRoles = attibuteRoles;

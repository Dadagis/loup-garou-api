const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    ability: {
      type: String,
      required: true,
    },
    phrase: {
      type: String,
      required: true,
    },
    conditionalPhrase: {
      type: String,
      required: false,
    },
    gamePhase: {
      type: Number,
      required: true,
    },
    team: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

const validateRole = (role) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ability: Joi.string().required(),
    phrase: Joi.string().required(),
    conditionalPhrase: Joi.string(),
    gamePhase: Joi.number().required(),
    team: Joi.string.required()
  });
  return schema.validate(role);
};

exports.Role = Role;
exports.validateRole = validateRole;

const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema({
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
});

const Role = mongoose.model("Role", roleSchema);

const validateRole = (role) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ability: Joi.string().required(),
  });
  return schema.validate(role);
};

exports.Role = Role;
exports.validateRole = validateRole;

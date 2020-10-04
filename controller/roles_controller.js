const { Role } = require("../models/role");

module.exports = {
  all: async (req, res) => {
    const roles = await Role.find();
    if (!roles) {
      res.status(404).send("No roles found");
    } else {
      try {
        res.send(roles);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  findById: async (req, res) => {
    const role = await Role.findById(req.params.id);
    if (!role) {
      res.status(404).send("The role with the given ID was not found !");
    } else {
      try {
        res.send(role);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};

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
};

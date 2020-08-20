require("dotenv").config();
const { Role, validateRole } = require("../models/role");
const mongoose = require("mongoose");

const data = [
  {
    name: "Loup",
    description: "bla bla bla",
    ability: "Manger",
  },
  {
    name: "Villageois",
    description: "nul",
    ability: "rien",
  },
];

const seed = async () => {
  await mongoose
    .connect(`${process.env.URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDb"));

  await Role.deleteMany({});

  data.forEach(async (role) => {
    const newRole = new Role({
      name: role.name,
      description: role.description,
      ability: role.ability,
    });

    try {
      const result = await newRole.save();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    mongoose.disconnect();
  });
};

seed();

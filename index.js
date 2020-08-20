require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

app.use(helmet());

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

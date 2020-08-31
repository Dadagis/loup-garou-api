require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

require("./startup/routes")(app);
require("./startup/db")();

app.use(helmet());

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

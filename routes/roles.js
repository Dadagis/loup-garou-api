const Role = require("../controller/roles_controller");
const express = require("express");
const router = express.Router();

router.get("/index", Role.all);

module.exports = router;

const Role = require("../controller/roles_controller");
const express = require("express");
const router = express.Router();

router.get("/index", Role.all);
router.get("/:id", Role.findById);

module.exports = router;

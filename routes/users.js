const auth = require("../middlewares/auth");
const User = require("../controller/users_controller");
const express = require("express");
const router = express.Router();

router.get("/me", auth, User.me);
router.post("/", User.create);
router.get("/:id", User.getUser)

module.exports = router;

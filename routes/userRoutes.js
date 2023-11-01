const express = require("express");
const passport = require("../passport-config");
const controllers = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", controllers.register);

module.exports = router;

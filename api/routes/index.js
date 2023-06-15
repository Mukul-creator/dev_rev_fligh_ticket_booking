const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const flightController = require("../controllers/flight");

// user-routes
router.post("/signUp", userController.user_signup);
router.post("/login", userController.user_login);

// Admin -apis

router.post("/addflight", flightController.add_flight);

module.exports = router;

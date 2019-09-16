const express = require('express');
const authController = require("../controllers/authController");

const routes = express.Router();

// routes.signIn

routes.signUp = ('/signUp', authController.signUp);
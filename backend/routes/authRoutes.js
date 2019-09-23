const express = require('express');
const sqlinjection = require('sql-injection');


const authController = require("../controllers/authController");

const routes = express.Router();

// routes.signIn

//Testar isso
routes.signUp = ('/signUp', sqlinjection, authController.signUp);
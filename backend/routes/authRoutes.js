const express = require('express');
const sqlinjection = require('sql-injection');


const authController = require("../controllers/authController");

const router = express.Router();

// router.signIn

//Testar isso
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

//get routes
router.get('/email-is-avaliable', authController.emailInUse);
router.get('/cpf-is-avaliable', authController.cpfInUse);



module.exports = router;
const express = require('express');
const sqlinjection = require('sql-injection');


const userController = require("../controllers/userController");

const router = express.Router();

// router.signIn

//get routes
router.get('/get-qrcode-from-id', userController.getQrCode);


module.exports = router;
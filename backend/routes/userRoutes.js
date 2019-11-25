const express = require('express');
const sqlinjection = require('sql-injection');


const userController = require("../controllers/userController");

const router = express.Router();

// router.signIn

//get routes
router.get('/get-qrcode-from-id', userController.getQrCode);
router.get('/get-user-info', userController.getUserInfo);
router.get('/avaliable-user-name', userController.isUserNameAvailable);

//put routes
router.put("/update-user", userController.updateUser);

module.exports = router;
const express = require('express');

const presantationController = require('../controllers/presantationController');

const router = express.Router();

router.get('/', presantationController.home);


module.exports = router;
const express = require('express');
const sqlinjection = require('sql-injection');


const authController = require("../controllers/authController");

const router = express.Router();

// router.signIn

//Testar isso
router.post('/sign-up', teste, authController.signUp);
router.post('/sign-in', authController.signIn);

function teste(req, res, next) {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = "this is my test secret. It can be anything";

    const {key} = req.params;

    if(key === undefined){
        err.statusCode = 500;
        throw err;
    }

    const token = key;


    if (token) {

        try {
            decodedToken = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
    } else {
        decodedToken = false;
    }

    if (!decodedToken) {
        const error = { message: 'Not Authenticated' };
        res.status(401).json(error);
        return;
        //throw error;
    }

    //Colocar as informações do usuario no request
    const user = {
        id: decodedToken.id
    };

    req.user = user;

    next();
}

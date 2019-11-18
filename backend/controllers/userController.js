const path = require('path');
const User = require('../models/User');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');
const qrCode = require('../helpers/qrcode');
const { baseDir } = require("../helpers/rootPath");


exports.getQrCode = async(req, res, next) => {
    const { userId } = req.query;
    
    //Verificar se é número

    // const imageName = '2.png';

    console.log(userId)

    const pathToImage = path.join(`../static/usersQrCode/${userId}.png`);
    
    res.status(200).send(`<img src="${pathToImage}">`);


};
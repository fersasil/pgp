const path = require('path');
const User = require('../models/User');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');
const qrCode = require('../helpers/qrcode');
const { baseDir } = require("../helpers/rootPath");


exports.getQrCode = (req, res, next) => {
    const { idUser } = req.query;
    
    //Verificar se é número

    // const imageName = '2.png';

    console.log(idUser)

    const pathToImage = path.join(`../static/usersQrCode/${idUser}.png`);
    
    res.status(200).send(`<img src="${pathToImage}">`);


};

exports.getUserInfo = async (req, res, next) => {
	const { idUser } = req.query;

	try{
		const userInfo = await User.findUserById(idUser);

		delete userInfo[0].passwordUser;
		delete userInfo.meta;

    	res.json({ status: 1, data: userInfo[0] });
	}
	catch(err) {
		console.log(err);
		res.json({ status: "-1", error: "Backend Error" })
        return;		
	}

}

exports.updateUser = async(req, res, next) => {
	const { idUser, data } = req.body;	

	try{
		const response = await User.updateUser(idUser, data);
		console.log(response);


    	res.json({ status: 1, data: response });
	}
	catch(err) {
		console.log(err);
		res.json({ status: "-1", error: "Backend Error" })
        return;		
	}
}

exports.isUserNameAvailable = async(req, res, next) => {
	const { nicknameUser } = req.query;

	try {
		const response = await User.findUserByNickname(nicknameUser);
		
		if(response.length === 0){ //Nome disponivel, nenhum usuário disponível com esse nome
			res.json({
				status: 1, 
				data: {avaliable: true} 
			});
		}
		else {
			res.json({
				status: 1, 
				data: {avaliable: false} 
			});
		}
	}
	catch(err) {
		console.log(err);
		res.json({ status: "-1", error: "Backend Error" })
        return;		
	}
}
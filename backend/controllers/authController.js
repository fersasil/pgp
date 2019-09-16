const User = require('../models/UserModel');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');


exports.signUp = (req, res, next) => {
    const {email, name, cpf, birthday, nickname, password} = req.body;
    const user = {
        name,
        password,
        cpf,
        email,
        birthday,
        nickname
    }

    const isValidInput = inputHelper.verifyInputs(user);

    if(!isValidInput){
        res.json({status: "-1", error: 'Invalid inputs'})
    }

    user.birthday = inputHelper.formatDate(user.birthday);
    
    try{
        const res = await User.createUser(user);
        
        if(res){
            const tokenData = {
                userId: res.userId
            }
            
            const token = authHelper.generateToken(tokenData);

            const data = {
                nickname: res.nickname,
                name: res.nameUser,
                id: res.idUser,
                token: token
            }

            res.json(data);
        }
        else{ //Erro no banco
            res.json({status: "-1", error: "Backend Error"})
        }
    }
    catch(err){
        console.log(err);
        res.json({status: "-1", error: "Backend Error"})
    }

    res.send("Vou conctar com o banco aqui!");
};

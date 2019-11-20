const User = require('../models/User');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');
const qrCode = require('../helpers/qrcode')

exports.emailInUse = async(req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const { email } = req.query;
    let user;

    if(email === undefined){
        res.json({isInUse: true, error: "Query is empty"});
        return;
    }

    try{
        user = await User.findUserByEmail({email});
    }
    catch(err) {
        err.status = 500;
        throw err;
    }
    
    if(user.length === 0){
        res.json({isInUse: false})
        return;
    }

    res.json({isInUse: true})

}

exports.cpfInUse = async(req, res, next) => {
    let { cpf } = req.query;
    let user;

    if(cpf === undefined){
        res.json({isInUse: true, error: "Query is empty"});
        return;
    }

    cpf = cpf.replace(/\D/g,'');

    try{
        user = await User.findUserByCpf({cpf});
    }
    catch(err) {
        err.status = 500;
        throw err;
    }
    
    if(user.length === 0){
        res.json({isInUse: false})
        return;
    }

    res.json({isInUse: true})

}


exports.signIn = async(req, res, next) => {
    //Verificar se o login é feito pelo cpf, nome de usuário ou senha!
    let user = req.body;

    if (!isNaN(user.identifier)) { //cpf
        user.type = "cpf"
    } else if (user.identifier.includes('@')) { // email
        user.type = "email"
    } else { // nickname
        user.type = "nickname"
    }

    user = await User.login(user);

    if (!user.isloggedIn) {
        // console.log("oi");
        res.json(user);
        return;
    }

    //get standart response from . Json webtoken, etc...

    const tokenData = {
        userId: user.userId,
        nickname: user.nicknameUser
    }

    const token = authHelper.generateToken(tokenData);

    const data = {
        idUser: user.idUser,
        token: token,
        cpfUser: user.cpfUser
    }

    res.json({ status: 1, data });

}

exports.signUp = async(req, res, next) => {
    const { email, cpf, password } = req.body;

    const user = {
        password,
        cpf,
        email
    }

    const isValidInput = inputHelper.verifyInputs(user);

    if (!isValidInput) {
        res.json({ status: "-1", error: 'Invalid inputs' });
        return;
    }

    //Cpf é passado como 000.000.00.47
    user.cpf = user.cpf.replace(/\D/g,'');

    try {
        const newUserCreated = await User.createUser(user);

        user.idUser = newUserCreated.insertId;

        if (!newUserCreated) { //Erro no banco
            res.json({ status: "-1", error: "Backend Error" })
            return;
        }

        const tokenData = {
            userId: user.userId,
            nickname: user.nickname
        }

        const token = authHelper.generateToken(tokenData);

        const data = {
            nickname: user.nickname,
            idUser: user.idUser,
            token: token
        }

        qrCode.createImage(user.idUser);
            
        console.log("IIIII")
        res.json({ status: 1, data });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            // TODO: mover para outro arquivo

            const errorAsString = err.toString();
            const errorSubstring = errorAsString.substring(errorAsString.indexOf('key'));
            const duplicatedField = errorSubstring.split('\'')[1];

            const error = new Error("User already signedUp");
            error.status = 400;
            error.info = { duplicatedField }

            console.log(duplicatedField);

            res.json({
                status: "-1",
                error: "User already signedUp",
                data: { duplicatedField }
            });

            throw error;

            return;
        }

        res.json({ status: "-1", error: "Backend Error" })
    }
};
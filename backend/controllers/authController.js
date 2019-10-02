const User = require('../models/User');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');
const qrCode = require('../helpers/qrcode')

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
        res.json({ isloggedIn: false });
    }

    //get standart response from . Json webtoken, etc...

    const tokenData = {
        userId: user.userId,
        nickname: user.nicknameUser
    }

    const token = authHelper.generateToken(tokenData);

    const data = {
        nickname: user.nicknameUser,
        name: user.nameUser.split()[0],
        idUser: user.idUser,
        token: token
    }

    res.json({ status: 1, data });

}

exports.signUp = async(req, res, next) => {
    console.log("OLa");
    const { email, name, cpf, birthday, nickname, password } = req.body;
    const user = {
        name,
        password,
        cpf,
        email,
        birthday,
        nickname
    }

    const isValidInput = inputHelper.verifyInputs(user);

    if (!isValidInput) {
        res.json({ status: "-1", error: 'Invalid inputs' });
        return;
    }

    user.birthday = inputHelper.formatDateToEn(user.birthday);

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
            name: user.name.split()[0],
            idUser: user.idUser,
            token: token
        }

        // qrCode.createUser(user.idUser);
        res.json({ status: 1, data });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            //Logica para encontrar o campo do erro que esta duplicado
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
        console.log(err);
    }
};
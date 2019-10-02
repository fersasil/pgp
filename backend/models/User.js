const dbHelper = require('../helpers/dbHelperAuxUsers');
const dbFunc = new dbHelper('User');

module.exports = class {
    constructor(params) {
        this.userId = params.idUser;
        this.name = params.nameUser;
        this.cpf = params.cpfUser;
        this.ocupation = params.ocupationUser;
        this.civilstatus = params.civilstatusUser;
        this.birthday = params.birthdayUser;
        this.gender = params.genderUser;
        this.nickname = params.nicknameUser;
        this.email = params.emailUser;
        this.password = params.passwordUser;
        this.phonenumber = params.phonenumberUser;
        this.image = params.imageUser;
    }

    /*static async emailNotAvaliabel(email) {
        return dbFunc.isInUse({
            attribute: 'email',
            myItem: email
        });
    }*/

    // ---- Function: createUser ---- //
    // Receive: params
    // Returns: 
    // Description: 
    static async createUser(params) { // Done
        //Todo encriptar a senha do usuário antes de salvar no banco!
        return dbFunc.createUser(params);
    }

    // ---- Function: updateUser ---- //
    // Receive: params
    // Returns: 
    // Description: 
    static async updateUser(params) { // Done
        return dbFunc.updateUser(params);
    }

    // ---- Function: findUserByName ---- //
    // Receive: nameUser
    // Returns: 
    // Description: 
    static async findUserByName(nameUser) { // Done
        return dbFunc.findUserByName(nameUser);
    }

    // ------ Need Review !! Warning !!! -----//
    // ---- Function: findUsersByEventID ---- //
    // Receive: eventID
    // Returns: 
    // Description: 
    static async findUsersByEventID(eventID) { // Done ?
        return dbFunc.findUsersByEventID(eventID);
    }

    // ---- Function: findUserById ---- //
    // Receive: idUser
    // Returns: 
    // Description: 
    static async findUserById(idUser) { // Done
        return dbFunc.findUserById(idUser);
    }

    // ---- Function: findUserByNickname ---- //
    // Receive: nicknameUser
    // Returns: 
    // Description: 
    static async findUserByNickname(nicknameUser) {
        return dbFunc.findUserByNickname(nicknameUser);
    }

    static async login(params) {
        let user;

        try {

            if (params.type === "nickname") {
                user = await dbFunc.loginByNickname(params);
            } else if (params.type === 'email') {
                user = await dbFunc.loginByEmail(params);
            } else if (params.type === 'cpf') {
                user = await dbFunc.loginByCPF(params);
            }
        } catch (err) {
            console.log(...err);
        }

        if (user[0] === undefined) {
            return false;
        }

        // TODO: encripitar a senha!
        if (user[0].passwordUser === params.password) {
            user[0].isloggedIn = true;

            return user[0];
        }

        return false;
    }
};
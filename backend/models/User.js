const dbHelper = require('../helpers/dbHelperAuxUsers');
const dbFunc = new dbHelper('User');

const USER_NOT_FOUND = 1;
const WRONG_PASSWORD = 2;

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
    // Receive: params(object)
    // Returns: 
    // Description: 
    static async createUser(params) { // Done
        //Todo encriptar a senha do usuário antes de salvar no banco!
        return dbFunc.createUser(params);
    }

    // ---- Function: updateUser ---- //
    // Receive: params(object)
    // Returns: 
    // Description: 
    static async updateUser(idUser, params) { // Done
        return dbFunc.updateUser(idUser, params);
    }

    // ---- Function: findUserByName ---- //
    // Receive: nameUser(string)
    // Returns: 
    // Description: 
    static async findUserByName(nameUser) { // Done
        return dbFunc.findUserByName(nameUser);
    }

    // ------ Need Review !! Warning !!! -----//
    // ---- Function: findUsersByEventID ---- //
    // Receive: eventID(Integer)
    // Returns: 
    // Description: 
    static async findUsersByEventID(eventID) { // Done ?
        return dbFunc.findUsersByEventID(eventID);
    }

    // ---- Function: findUserById ---- //
    // Receive: idUser(integer)
    // Returns: 
    // Description: 
    static async findUserById(idUser) { // Done
        return dbFunc.findUserById(idUser);
    }

    // ---- Function: findUserByEmail ---- //
    // Receive: emailUser(string)
    // Returns: 
    // Description: 
    static async findUserByEmail(params) { // Done
        return dbFunc.findUserByEmail(params);
    }

    // ---- Function: findUserByCpf ---- //
    // Receive: cpfUser(string)
    // Returns: 
    // Description: 
    static async findUserByCpf(cpfUser) { // Done
        return dbFunc.findUserByCpf(cpfUser);
    }

    // ---- Function: findUserByNickname ---- //
    // Receive: nicknameUser(string)
    // Returns: 
    // Description: 
    static async findUserByNickname(nicknameUser) {
        return dbFunc.findUserByNickname(nicknameUser);
    }

    // ------- Function: registerLogIn ------- //
    // Receive: idUser(integer)
    // Returns: 
    // Description: 
    static async registerLogIn(idUser){
        return dbFunc.registerLogIn(idUser);
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
            return {loggedIn: false, error: USER_NOT_FOUND};
        }


        // TODO: encripitar a senha!
        if (user[0].passwordUser === params.password) {
            user[0].isloggedIn = true;

            return user[0];
        }

        return {loggedIn: false, error: WRONG_PASSWORD};
    }
};
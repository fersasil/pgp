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
    static async createUser(params) { // Done
        return dbFunc.createUser(params);
    }

    // ---- Function: updateUser ---- //
    // Receive: params
    // Returns: 
    static async updateUser(params) { // Done
        return dbFunc.updateUser(params);
    }

    // ---- Function: findUserByName ---- //
    // Receive: nameUser
    // Returns: 
    static async findUserByName(nameUser) { // Done
        return dbFunc.findUserByName(nameUser);
    }

    // ------ Need Review !! Warning !!! -----//
    // ---- Function: findUsersByEventID ---- //
    // Receive: eventID
    // Returns: 
    static async findUsersByEventID(eventID) { // Done ?
        return dbFunc.findUsersByEventID(eventID);
    }

    // ---- Function: findUserById ---- //
    // Receive: idUser
    // Returns: 
    static async findUserById(idUser) { // Done
        return dbFunc.findUserById(idUser);
    }

    // ---- Function: findUserByNickname ---- //
    // Receive: nicknameUser
    // Returns: 
    static async findUserByNickname(nicknameUser){
        return dbFunc.findUserByNickname(nicknameUser);
    }
};
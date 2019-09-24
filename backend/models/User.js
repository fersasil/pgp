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

    static async createUser(params) { // Done
        return dbFunc.createUser(params);
    }

    static async updateUser(params) { // Done
        return dbFunc.updateUser(params);
    }

    static async findUserByName(username) { // Done
        return dbFunc.findUserByName(username);
    }

    // Need Review !! Warning !!!
    static async findUsersByEventID(eventID) { // Done ?
        return dbFunc.findUsersByEventID(eventID);
    }

    static async findUserById(id) { // Done
        return dbFunc.findUserById(id);
    }

};
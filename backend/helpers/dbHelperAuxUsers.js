const pool = require('../helpers/dbConnect');

module.exports = class {
    async query(query, args) {
        return new Promise(async(resolve, reject) => {
            const queryVar = args;
            const queryStr = query;
            let conn;

            try {
                conn = await pool.getConnection();
                const rows = await conn.query(queryStr, queryVar);
                conn.end();
                resolve(rows);
            } catch (err) {
                conn.end();
                if (reject) reject(err);
                errorHandler(err);
            }
        });
    }

    async createUser(user){
        return this.query("INSERT INTO User(nameUser, cpfUser, birthdayUser, nicknameUser, emailUser, passwordUser) VALUES (" + user.name + ", " + user.cpf + ", " + user.birthday + ", " + user.nickname + ", " + user.email + ", " + user.password + ");");
    }

    //Made in this way to don't need make a lot of calls of update, but values not informed yet need be NULL
    async updateUser(user){
        return this.query("UPDATE `User` SET `User`.`ocupationUser`="+user.ocupation+", `User`.`civilstatusUser=`"+user.civilstatus+", `User`.`genderUser`="+user.genderUser+", `User`.`emailUser`="+user.email+", `User`.`passwordUser`="+user.password+", `User`.`phonenumberUser`="+user.phonenumber+", `User`.`imageUser`="+user.image+" WHERE `User`.`cpfUser` = '"+ user.cpf + "';")
    }

    async findUserByName(userName) {
        return this.query("SELECT * FROM `User` WHERE `User`.`nameUser` = '" + userName + "';");
    }

    // Maybe search users by subevent
    async findUsersByEventID(eventID) {
        return this.query("SELECT `User`.`nameUser`, `User`.`imageUser` FROM `User` INNER JOIN `User_Event` ON `User`.`idUser` = `User_Event`.`userIdUser` INNER JOIN `Event` ON `User_Event`.`eventIdEvent`=`Event`.`idEvent` WHERE `Event`.`idEvent`=" + eventID + ";")
    }

/*    async findUserByCPF(userCPF) {
        const commonInfo = this;
        return this.query("SELECT * FROM `User` WHERE `User`.`nameUser` = '" + userCPF + "'");
    }*/

    async findUserById(userID){
        const commonInfo = this;
        return this.query("SELECT * FROM `User` WHERE `User`.`idUser` = '" + userID + "';");
    }

};
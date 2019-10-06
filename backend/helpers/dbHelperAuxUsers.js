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
            }
        });
    }

    async createUser(user) {
        return this.query("INSERT INTO User(cpfUser, emailUser, passwordUser) VALUES (?, ?, ?)", [user.cpf, user.email, user.password]);
    }

    //This way you don't need a lot of calls for updates, but values not informed yet need to be NULL
    async updateUser(params) {
        //console.log([...params]);
        const keysDB = Object.keys(params);

        const values = [];
        let call = "UPDATE `User` SET "

        for (let key of keysDB) {
            call += "`User`.`" + key + "`= ?,";
            values.push(params[key]);
        }

        call = call.substring(0, call.length - 1);
        call += ";"
            //params[keysDB]
        return this.query(call, values);
    }

    async findUserByName(userName) {
        return this.query("SELECT * FROM `User` WHERE `User`.`nameUser` = ?", [userName]);
    }

    async findUserByNickname(nicknameUser) {
        return this.query("SELECT * FROM `User` WHERE `User`.`nicknameUser` = ?", [nicknameUser]);
    }

    async findUserByEmail(params) {
        return this.query("SELECT * FROM `User` WHERE `User`.`emailUser` = ?", [params.email]);
    }

    async findUserByCpf(params) {
        return this.query("SELECT * FROM `User` WHERE `User`.`cpfUser` = ?", [params.cpf]);
    }

    // Maybe search users by subevent
    async findUsersByEventID(eventID) {
        return this.query("SELECT `User`.`nameUser`, `User`.`imageUser` FROM `User` INNER JOIN `User_Event` ON `User`.`idUser` = `User_Event`.`userIdUser` INNER JOIN `Event` ON `User_Event`.`eventIdEvent`=`Event`.`idEvent` WHERE `Event`.`idEvent`=" + eventID + ";")
    }

    /*    async findUserByCPF(userCPF) {
            const commonInfo = this;
            return this.query("SELECT * FROM `User` WHERE `User`.`nameUser` = '" + userCPF + "'");
        }*/

    async findUserById(userID) {
        const commonInfo = this;
        return this.query("SELECT * FROM `User` WHERE `User`.`idUser` = '" + userID + "';");
    }

    async loginByNickname(params) {
        return this.query("SELECT nameUser, idUser, nicknameUser, passwordUser, imageUser FROM `User` WHERE `User`.`nicknameUser` = ?", [params.identifier]);
    }

    async loginByEmail(params) {
        return this.query("SELECT nameUser, idUser, nicknameUser, passwordUser, imageUser FROM `User` WHERE `User`.`emailUser` = ?", [params.identifier]);
    }

    async loginByCPF(params) {
        return this.query("SELECT nameUser, idUser, nicknameUser, passwordUser, imageUser FROM `User` WHERE `User`.`cpfUser` = ?", [params.identifier]);
    }



};
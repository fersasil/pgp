const pool = require('../helpers/dbConnect');

module.exports = class {
    constructor(params) {
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.id = params.id;
    }

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


    async findEventByID(event) {
        const commonInfo = this;

        return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE `Event`.`idEvent` = " + event);
    }

    async findEvent(event) {
        const commonInfo = this;

        return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE `Event`.`idEvent` = " + event);
    }

};
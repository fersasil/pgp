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

    // REDO
    async findAllEvents(event) {
        // Essa função deve implementar paginação*
        return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE '1'");
    }

    // REDO
    async findEventByID(event) {
        // mesma erro que as funções de baixo
        return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE `Event`.`idEvent` = " + event);
    }

    // REDO
    async deleteEventByID(event) {
        // O que é esse event? é um objeto? Isso não vai funcionar desse jeito
        return this.query("DELETE FROM `Event` WHERE `idEvent` = ?", [event]);
    }

    // REDO
    async findEventByTitle(event) {
        // O que é esse event? 
        // Passar 'parametro' p/ sql com o placeholder ? - previne sql injection!
        // return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE `Event`.`titleEvent` LIKE '%?%'", [event]);
        return this.query("SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE `Event`.`titleEvent` LIKE '%" + event + "%'");
    }

    // Redo
    async createNewEvent(event) {

        return this.query("INSERT INTO `Event`(`idEvent`, `titleEvent`, `subtitleEvent`, `descriptionEvent`, `vagasEvent`, `startEvent`, `endEvent`, `priceEvent`, `Address_idAddress`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)", [event.titleEvent, event.subtitleEvent, event.descriptionEvent, event.vagasEvent, event.startEvent, event.endEvent, event.priceEvent, event.Address_idAddress]);
    }

    //Redo
    async updateEventByID(event) {

        //Refazer
        // return this.query("UPDATE `Event` SET `titleEvent`="+event.titleEvent+",`subtitleEvent`="+event.subtitleEvent+",`descriptionEvent`="+event.descriptionEvent+",`vagasEvent`="+event.vagasEvent+",`startEvent`="+event.startEvent+",`endEvent`="+event.endEvent+",`priceEvent`="+event.priceEvent+",`Address_idAddress`="+event.Address_idAddress+" WHERE `idEvent` = "+ event.idEvent);
    }

    // REDO
    // Essa função não faz o menor sentido! nome estranho
    async findEventByUserID(id) {
        return this.query("SELECT `Event`.* FROM `Event` JOIN `User_Event` ON `User_Event`.`eventIdEvent` = `Event`.`idEvent` JOIN `User` ON . `User`.`idUser` = `User_Event`.`userIdUser` WHERE `User`.`idUser` = " + id);
    }

};
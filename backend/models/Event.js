const bcrypt = require('bcrypt');

const dbHelper = require('../helpers/dbFunctions');
const dbFunc = new dbHelper('Event');

module.exports = class {
    constructor(params) {
        this.idEvent = params.idEvent;
        this.titleEvent = params.titleEvent;
        this.subtitleEvent = params.subtitleEvent;
        this.descriptionEvent = params.descriptionEvent;
        this.vagasEvent = params.vagasEvent;
        this.startEvent = params.startEvent;
        this.endEvent = params.endEvent;
        this.priceEvent = params.priceEvent;
        this.Address_idAddress = params.Address_idAddress;
    }

    /*static async emailNotAvaliabel(email) {
        return dbFunc.isInUse({
            attribute: 'email',
            myItem: email
        });
    }*/

    static async findAllEvents() { // DONE
        return dbFunc.findAllEvents();
    }

    static async createNewEvent(params) { // DONE
        return dbFunc.createNewEvent(params);
    }

    static async deleteEventById(idEvent) { // DONE
        return dbFunc.deleteEventById(idEvent);
    }

    static async findEventByTitle(title) { // Done (name changed)
        return dbFunc.findEventByTitle(title);
    }

    static async updateEventById(idEvent, params) { // DONE
        return dbFunc.updateById(idEvent, params);
    }

    static async findEventById(idEvent) { // DONE
        return dbFunc.findEventByID(idEvent);
    }

};

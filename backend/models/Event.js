const dbHelper = require('../helpers/dbHelper');
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

    // Redo
    static async createEvent(params) { // DONE
        return dbFunc.createEvent(params);
    }

    static async deleteEventById(idEvent) { // DONE
        return dbFunc.deleteEventById(idEvent);
    }

    static async findEventByTitle(title) { // Done (name changed)
        return dbFunc.findEventByTitle(title);
    }

    // Redo
    static async updateEventById(idEvent, params) { // REDO
        return dbFunc.updateById(idEvent, params);
    }

    static async findEventById(idEvent) { // DONE
        return dbFunc.findEventByID(idEvent);
    }

    static async findAllEventsByUserId(idUser){ // It wasn't in the model until I added.
        return dbFunc.findAllEventsByUserId(idUser);
    }

};
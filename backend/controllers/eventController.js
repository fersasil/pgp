const Event = require('../models/Event');
const inputHelper = require('../helpers/inputHelper');
const authHelper = require('../helpers/authHelper');
const qrCode = require('../helpers/qrcode')


exports.managementEvents = async(req, res, next) => {
    const {idUser} = req.body; //localhost:3000/api/url?userId=1?pato=5
    try{
        Event.findAllEventsByUserId(idUser);
        res.json({ status: 1, data });
    }catch(err){
        res.json({ status: "-1", error: "Backend Error" });
    }
}

exports.getAllEvents = async(res, next) => {
    try{
        Event.findAllEvents();
        res.json({status: 1, data});
    }catch(err){
        res.json({status: "-1", error: "Backend Error"});
    }
}

exports.getEventByTitle = async(req, res, next) => {
    const {title} = req.body; // or titleEvent
    try{
        Event.findEventByTitle(title);
        res.json({status: 1, data});
    }catch(err){
        res.json({status: "-1", error: "Backend Error"});
    }
}

exports.getEventById = async(req, res, next) => {
    const {idEvent} = req.body;
    /*try{
        user = await User.findUserByEmail({email});
    }
    catch(err) {
        err.status = 500;
        throw err;
    }*/
    try{
        Event.findEventById(idEvent)
        res.json({status: 1, data});
    }catch(err){
        res.json({status: "-1", error: "Backend Error"});
    }
}

exports.createEvent = async(req, res, next) => {
    const {titleEvent, subtitleEvent, descriptionEvent, vagasEvent, startEvent, endEvent, priceEvent, Address_idAddress} = req.body;
    const event = {
        titleEvent,
        subtitleEvent,
        descriptionEvent,
        vagasEvent,
        startEvent,
        endEvent,
        priceEvent,
        Address_idAddress
    }

    try {
        const newEventCreated = await Event.createEvent(event);
        if(!newEventCreated){ // Database error
            res.json({ status: "-1", error: "Database Error" })
            return;
        }
        res.json({ status: 1, data }); // Event created
    }catch(err){
        res.json({ status: "-1", error: "Backend Error" });
    }
}

exports.editEvent = async(req, res, next) => {
    const {idEvent, titleEvent, subtitleEvent, descriptionEvent, vagasEvent, startEvent, endEvent, priceEvent, Address_idAddress} = req.body;
    const event = {
        idEvent,
        titleEvent,
        subtitleEvent,
        descriptionEvent,
        vagasEvent,
        startEvent,
        endEvent,
        priceEvent,
        Address_idAddress
    }

    try {
        const newEventCreated = await Event.updateEventById(event);
        if(!newEventCreated){ // Database error
            res.json({ status: "-1", error: "Database Error" })
            return;
        }
        res.json({ status: 1, data }); // Event created
    }catch(err){
        res.json({ status: "-1", error: "Backend Error" });
    }
}
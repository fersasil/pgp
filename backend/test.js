
<<<<<<< HEAD
const Event = require("./models/Event");


async function teste(){
    try{
        const rows = await Event.findEventByTitle({
            name: "Teste",
            id: "15"
        });
=======

const dbHelper = require("./helpers/dbHelperAuxUsers");
const dbFunc = new dbHelper('Event');

async function teste(){
    try{
        const rows = await dbFunc.findUsersByEventID(1);
>>>>>>> d207b8b4454a65b8fadcda631ac784a8440ca33c
        const res = [...rows];
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}

teste();



const dbHelper = require("./helpers/dbHelper");
const dbFunc = new dbHelper('Event');

async function teste(){
    try{
    // >> Events Area
        // Testing findAllEvents()
        const rows = await dbFunc.findAllEvents();
        const res = [...rows];
        console.log(res);

        // Testing createNewEvent()
        const rows = await dbFunc.createNewEvent(); // Need pass a object as params
        const res = [...rows];
        console.log(res);

        // Testing findEventByID()
        const rows = await dbFunc.findEventByID(1);
        const res = [...rows];
        console.log(res);
    
        // Testing deleteEventByID()
        const rows = await dbFunc.findUsersByEventID(1);
        const res = [...rows];
        console.log(res);

        // Testing findEventByTitle()
        const rows = await dbFunc.findEventByTitle("Batata");
        const res = [...rows];
        console.log(res);

    }
    catch(err){
        console.log(err);
    }
}

teste();



const dbHelper = require("./helpers/dbHelper");
const dbFunc = new dbHelper('Event');

async function teste(){
    try{
    // >> Events Area
        // Testing findAllEvents()
        const rows_0 = await dbFunc.findAllEvents();
        const res_0 = [...rows_0];
        console.log(res_0);
/*
        // Testing createNewEvent()
        const rows_1 = await dbFunc.createNewEvent(); // Need pass a object as params
        const res_1 = [...rows_1];
        console.log(res_1);
*/
        // Testing findEventByID()
        const rows_2 = await dbFunc.findEventByID(1);
        const res_2 = [...rows_2];
        console.log(res_2);
/*
        // Testing deleteEventByID()
        const rows_3 = await dbFunc.deleteEventByID(1);
        const res_3 = [...rows_3];
        console.log(res_3);

        //Testing updateEventById()
        const rows_4 = await dbFunc.updateEventByID(2);
        const res_4 = [...rows_4];
        console.log(res_4);
*/
        // Testing findEventByTitle()
        const rows_5 = await dbFunc.findEventByTitle("Batata");
        const res_5 = [...rows_5];
        console.log(res_5);

    }
    catch(err){
        console.log(err);
    }
}

teste();

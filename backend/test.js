// const pool = require('./helpers/dbConnect');


const dbHelper = require("./helpers/dbHelperAuxUsers");
const dbFunc = new dbHelper('Event');

async function teste(){
    try{
        const rows = await dbFunc.findUsersByEventID(1);
        const res = [...rows];
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}

teste();

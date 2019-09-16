// const pool = require('./helpers/dbConnect');

const queryStr = "SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE 1";

const dbHelper = require("./helpers/dbHelper");
const dbFunc = new dbHelper('Event');

async function teste(){
    try{
        const rows = await dbFunc.findEventByTitle("Teste");
        const res = [...rows];
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}

teste();

// const pool = require('./helpers/dbConnect');

// const queryVar = args;
const queryStr = "SELECT * FROM `Event` INNER JOIN `Address` ON `Event`.`Address_idAddress` = `Address`.`idAddress` WHERE 1";
// let conn;

// async function teste(){

//     try {
//         console.log("OLA 1")
//         conn = await pool.getConnection();
//         const rows = await conn.query(queryStr);
//         console.log(...rows);

//         conn.end();
//     } catch (err) {
//         console.log(err)

//         conn.end();
//         // errorHandler(err);
//     }

// }


// teste();


const dbHelper = require("./helpers/dbHelper");
const dbFunc = new dbHelper('Event');


dbFunc.findByEmail('jotge');

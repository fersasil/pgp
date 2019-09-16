const pool = require('./helpers/dbConnect');

// const queryVar = args;
const queryStr = "";
let conn;

async function teste(){

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(queryStr, queryVar);
        console.log(rows);
        
        conn.end();
    } catch (err) {
        conn.end();
        // errorHandler(err);
    }

}


teste();
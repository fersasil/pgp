const mariadb = require('mariadb');

module.exports = mariadb.createPool({
    connectionLimit: 15,
    host: 'localhost',
    user: 'pato',
    password: 'b1b2b3b4',
    database: 'mydb',
});
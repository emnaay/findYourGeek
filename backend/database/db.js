const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port:'3308',
    user: 'root',
    password:'',
    database: 'findyourgeekdb'
})

module.exports = db;
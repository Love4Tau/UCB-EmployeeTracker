const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "C0c0puffs650",
        database: "employee_Trackerdb",
    }
)
module.exports = db;
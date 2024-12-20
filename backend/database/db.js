const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: "3308",
  user: "root",
  password: "",
  database: "findyourgeekdb",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;

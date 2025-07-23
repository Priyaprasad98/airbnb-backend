const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "@123Piku",
  database: "airbnb"
});

module.exports = pool.promise();
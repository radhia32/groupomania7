const mysql = require('mysql2');
require('dotenv').config();
const sql = mysql.createPool({
  host: process.env.HOST,
  user: "d2xdPMlToC",
  database:process.env.DATABASE,
  password: process.env.PASSWORD,

});

sql.getConnection(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('db connected');
});

module.exports = sql;
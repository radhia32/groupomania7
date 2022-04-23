const mysql = require('mysql2');
const sql = mysql.createPool({
  host: "remotemysql.com",
  user: "d2xdPMlToC",
  database:"d2xdPMlToC",
  password: "s6woRImFNQ",

});

sql.getConnection(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('db connected');
});

module.exports = sql;
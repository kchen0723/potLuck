var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.0.186',//远程MySQL数据库的ip地址
  user     : 'henry',
  password : '123456',
  database : 'ourdb',
  charset	:'UTF8_GENERAL_CI',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();

var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : '192.168.0.186',       
  user     : 'henry',              
  password : '123456',       
  port: '3306',                   
  database: 'ourdb', 
}); 
 
connection.connect();
 
var modSql = 'UPDATE sadmin SET password = ? WHERE username = ?';
var modSqlParams = ['123456', 'young'];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});
 
connection.end();

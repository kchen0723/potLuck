
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : '192.168.0.186',       
  user     : 'henry',              
  password : '123456',       
  port: '3306',                   
  database: 'ourdb', 
}); 
 
connection.connect();
 
var  sql = 'SELECT * FROM sadmin';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();


var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : '192.168.0.186',       
  user     : 'henry',              
  password : '123456',       
  port: '3306',                   
  database: 'ourdb', 
}); 
 
connection.connect();
 
var  addSql = 'INSERT INTO sadmin(Id,username,password) VALUES(5,?,md5(?))';
var  addSqlParams = ['young', '123'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();

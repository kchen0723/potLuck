var connection = mysql.createConnection({     
  host     : '192.168.0.186',       
  user     : 'henry',              
  password : '123456',       
  port: '3306',                   
  database: 'ourdb', 
}); 
 
connection.connect();
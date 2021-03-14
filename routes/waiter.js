var express = require('express');
var router = express.Router();
 var mysql  = require('mysql');  

router.get('/', function(req, res, next) {
  res.render('waiter/login.html',{"message":"init","biaoji":"1"}); //path.resolve process the path locally first.


});

router.post('/login', function(req, res) {

  var username=req.body['username']
  var password=req.body['password']
  // -----------Create SQL-------------------
 var sql = 'select * from waiter where username=? and password=?';   
 var param = [username,password]; 
// -------------Create connect-------------------------
 

 
var connection = mysql.createConnection({     
  host     : '192.168.0.186',       
  user     : 'henry',              
  password : '123456',       
  port: '3306',                   
  database: 'ourdb', 
}); 
 
connection.connect();
 // ----------------------Query---------------------------------------

connection.query(sql,param,function (err, result) {
        if(err){
          console.log('Database error: ',err.message);
          return;
        }
 	// console.log(result);   
    //console.log(rs.length);   
        if(result.length>0){   
             // res.send('登录成功'); 
        
             res.render('waiter/index', {'username': username}); 
  
              
        }else{   
        	

            res.render('waiter/login',{"message":"用户名密码错误","biaoji":"2"}); 

        }   

});
 
connection.end();               

   
});


// ----------------------------------------------

module.exports = router;				

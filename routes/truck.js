var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//  POST 请求  
//post form可以放任意文件夹这里的例子是在potluck 文件夹外面的post.html,action写法是：action="http://localhost/users/"
router.post('/', function (req, res) {  
//post form可以放任意文件夹这里的例子是在potluck 文件夹外面的post.html,action写法是：action="http://localhost/users/"
   console.log("主页 POST 请求");  
   res.send('Hello POST');  
})  

//无论get还是post全可以接收访问  
// 访问方法http://localhost/users/all
// form的写法：action="http://localhost/users/all"
router.all('/all', function (req, res) {  
   console.log("POST,GET 请求全接受");  
   res.send('Hello all');  
})    
//第三种方法,用sendFile
//aa.html必须放在项目所在的盘符下
router.get('/aa',function(req,res){  
   res.sendFile('/www/aa.html'); //http://localhost/users/aa 
})                  

module.exports = router;

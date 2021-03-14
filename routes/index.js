var express = require('express');
var path = require("path");
var router = express.Router();
router.get('/',function(req ,res){

		// res.render('potluck');
		res.render('../views/waiter/login.html'); //path.resolve process the path locally first.
	})
//浏览器用http://localhost/list_user访问
// router.get('/list_user', function (req, res) {  	
//    console.log("/list_user GET 请求");  
//    res.send('用户列表页面');  
// }) 

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求  
//如访问http://localhost/ab555.cd
// router.get('/ab*cd', function(req, res) {     

//    console.log("/ab*cd GET 请求");  
//    res.send('正则匹配');  
// }) 


// 进入管理员登录窗口---http://localhost/bosslogin
router.get('/bosslogin',function(req,res){  
   res.render('../views/boss/login.html'); 
}) 

//进入管理页面---http://localhost/admin
router.get('/admin',function(req,res){  
   res.render('../views/boss/index.html'); 
})  

//进入服务页面---http://localhost/waiter 
// router.get('/waiter',function(req,res){  
//    res.render('../views/waiter/index.html'); 
// })

router.get('/manage-menu',function(req,res){
	res.render('../views/boss/tables.html');
})

router.get('/manage-employees',function(req,res){
	res.render('../views/boss/user-tables.html');
})

router.get('/manage-tables',function(req,res){
	res.render('../views/boss/table-manage.html');
})

router.get('/manage-tables/table-plan', function(req,res){
	res.render('../views/boss/table-plan.html');
})

router.get('/customer', function(req,res){
	res.render('../views/customer/index.html');
})
module.exports = router;				//router是第二行定义的变量

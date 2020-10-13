/* iweb项目的后台动态web服务器功能：接收客户端提交的HTTP请求（request）
读取请求中客户端提交来的数据；
   向数据库服务器提交SQL命令以操作底层数据；
   最后向客户端发送HTTP响应(response)，说明执行成功还是失败*/
   // const express =require('express')
   // let app=express();
   // app.listen(8000,()=>{
	  //  console.log('Server Listening on Port 8080')
   // })
   const express = require('express')

 //创建一个Web服务器
 let app = express();
 // 让动态Web服务器监听在指定的端口上,及启动服务器
 let port = 5050  //此处在为新浪云服务器做铺垫
 app.listen(port,()=>{
 	console.log('Server Listening on Port:',port)
 })
//让web服务器可以接收一个特定夫人请求，并回复该请求
app.get('/index',(req, res)=>{
	res.send('Welcome to My Site Index!')
})
/*
*API.1:向客户端输出“排名前12位的最新课程”
* 请求方法：GET
* 请求地址：/course/newset
* 请求参数：无
* 响应数据
* [
	{
		cid=3,
		cname:'微信小程序开发'
		pic:'img/course/01.jpg'
		tname:'程涛'
		price:599
	},
	{
		....
	},
	.....
]
*/

const mysql=require('mysql')
let pool=mysql.createPool({
	host:'127.0.0.1',
	post:'3306',
	user:'root',
	password:'',
	database:'iweb',
	connectionLimit:10,
})

app.get('/course/newest',(req,res)=>{
	//向数据库服务器发送查询请求，获取必须的课程数据
	let sql = 'SELECT cid,cname,iw_course.pic,price,tname FROM iw_course,iw_teacher WHERE iw_course.teacher_id=iw_teacher.tid ORDER BY cid DESC LIMIT 0,12'
		pool.query(sql, (err,result)=>{
			if(err){        //数据库操作执行错误
			    console.log('数据库查找成功！')
				throw err
				
			}
			console.log('数据库查询成功！')
			
			res.send(result)
		})

	
	//将数据库返回的课程输出发送给客户端
	//res.send([{cid:3},{cid:9},{cid:5}])
})
   app.get('/course/hottest',(req,res)=>{
   	//向数据库服务器发送查询请求，获取必须的课程数据
   	let sql = 'SELECT cid,cname,iw_course.pic,price,tname FROM iw_course,iw_teacher WHERE iw_course.teacher_id=iw_teacher.tid ORDER BY cid DESC LIMIT 12,0'
   		pool.query(sql, (err,result)=>{
   			if(err){        //数据库操作执行错误
   			    console.log('数据库查找成功！')
   				throw err
   				   
   			}
   			console.log('数据库查询成功！')
   			
   			res.send(result)
   		})
   
   	
   	//将数据库返回的课程输出发送给客户端
   	//res.send([{cid:3},{cid:9},{cid:5}])
   })
var express = require('express');
var app = express();
app.use(express.static('views'));

var JsonResult = require('./jsonresult')
var ClubService = require('./ClubService');
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   res.send('welcome to toastmaster club center');
})

app.get('/clubs/:clubId', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.getClubInfo(req.params.clubId, function(results){
   		 console.log(results); 
		   res.json({club: results[0]});
   },function(errMsg){
   		 console.log(errMsg); 
		   res.json({error: errMsg});
   });
})


var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
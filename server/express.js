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
   var clubService = new ClubService();
   clubService.getClubInfo(req.params.clubId, function(results){
		   res.json({club: results[0]});
   },function(errMsg){
		   res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/officers', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.getOfficers(req.params.clubId, function(results){
       res.json({officers: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/guests', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.getGuests(req.params.clubId, function(results){
       res.json({guests: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/members', function (req, res) {
   var clubService = new ClubService();
   clubService.getMembers(req.params.clubId, function(results){
       res.json({members: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/members/:memberId', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.getMember(req.params.clubId, req.params.memberId, function(results){
       res.json({result: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
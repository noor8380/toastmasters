var express = require('express');
var http = require('http');

var app = express();
app.use(express.static('views'));

var JsonResult = require('./jsonresult')
var ClubService = require('./ClubService');

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
   var clubService = new ClubService();
   clubService.getMember(req.params.clubId, req.params.memberId, function(results){
       res.json({result: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/members/:memberId/applycc/:ccId', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.applyCC(req.params.clubId, req.params.memberId, req.params.ccId, function(results){
       res.json({result:true});
   },function(errMsg){
       res.json({error:false});
   });
})

app.get('/clubs/:clubId/members/:memberId/applycl/:clId', function (req, res) {
   console.log(req.params);
   var clubService = new ClubService();
   clubService.applyCL(req.params.clubId, req.params.memberId, req.params.clId, function(results){
       res.json({result:true});
   },function(errMsg){
       res.json({error:false});
   });
})

http.createServer(app).listen(8081, function(){
  console.log("Express server listening on port 8081");
});

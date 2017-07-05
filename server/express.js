var express = require('express');
var http = require('http');

var app = express();
var bodyParser = require('body-parser')

app.use(express.static('views'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

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

app.get('/clubs/:clubId/meetings', function (req, res) {
   var clubService = new ClubService();
   clubService.getMeetings(req.params.clubId, function(results){
       res.json({meetings: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/meetings/latest', function (req, res) {
   var clubService = new ClubService();
   clubService.getlastestMeeting(req.params.clubId, function(results){
       res.json({meeting: results});
   },function(errMsg){
       res.json({error: errMsg});
   });    
})

app.get('/clubs/:clubId/meetings/:meetingId', function (req, res) {
   var clubService = new ClubService();
   clubService.getReports(req.params.clubId,req.params.meetingId, function(results){
       res.json({reports: results});
   },function(errMsg){
       res.json({error: errMsg});
   });    
})

app.post('/clubs/:clubId/meetings/:meetingId/addreport', function (req, res) {
    var evaluator = req.body.evaluator;
    var speaker = req.body.speaker;
    var content = req.body.content;
    var clubService = new ClubService();
    clubService.addReport(req.params.clubId,req.params.meetingId,evaluator,speaker,content, function(results){
         res.json({status: "true"});
     },function(errMsg){
         res.json({error: errMsg});
     });
})

app.get('/clubs/:clubId/officers', function (req, res) {
   var clubService = new ClubService();
   clubService.getOfficers(req.params.clubId, function(results){
       res.json({officers: results});
   },function(errMsg){
       res.json({error: errMsg});
   });
})

app.get('/clubs/:clubId/guests', function (req, res) {
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

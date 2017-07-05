var DBFactory = require('./database'); 

function clubservice(){
	
	this.getClubInfo = function(clubId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = 'SELECT * FROM CLUB where club_id = '+clubId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
		   
	}

	this.getMeetings = function(clubId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = 'SELECT * FROM MEETING where club_id = '+clubId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
		   
	}

	this.getReports = function(clubId,meetingId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "select * from EVALUATIONS where EVALUATIONS.meeting_id = "+meetingId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
		   
	}

	this.getlastestMeeting = function(clubId,successCallback,failCallback){
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "select * from MEETING where MEETING.meeting_id = "+
		 				"(select max(meeting_id) from MEETING where MEETING.club_id = "+clubId+")";
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

	this.addReport = function(clubId,meetingId,evaluator,speaker,content,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var sql = "insert into EVALUATIONS(evaluator,speaker,content,complete_time,meeting_id) values("+conn.escape(evaluator)+","+conn.escape(speaker)+","+conn.escape(content)+",now(),"+meetingId+")"
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}


	this.getOfficers = function(clubId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "SELECT * FROM OFFICERS where OFFICERS.club_id = "+clubId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

	this.getGuests = function(clubId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "SELECT * FROM GUESTS where GUESTS.club_id = "+clubId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

	this.getMembers = function(clubId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "SELECT * FROM MEMBERS where MEMBERS.club_id = "+clubId;
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

	this.getMember = function(clubId, memberId,successCallback,failCallback){    
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "SELECT * FROM MEMBERS where MEMBERS.club_id = "+clubId+" and MEMBERS.member_id = "+memberId;
		  	var resultObject={};
		  	conn.query(sql,function (err, result) {
	            if(err){
	              	console.log('[SELECT ERROR] - ',err.message);
	              	dbFactory.closeConnection(conn);
	              	return failCallback(err);
	            }
	            else{
	            	resultObject.member=result[0];
	            	var sql2 = "select CCRECORDS.member_id, CCRECORDS.ccr_status, CCRECORDS.complete_time, CCPROJECT.cc_id, "+
	            					" CCPROJECT.cc_level, CCPROJECT.cc_type, CCPROJECT.cc_name"+
									" from (select * from CCRECORDS where CCRECORDS.member_id = "+memberId+") as CCRECORDS"+
									" RIGHT JOIN  CCPROJECT "+
									" ON CCPROJECT.cc_id = CCRECORDS.cc_id";
	            	conn.query(sql2,function (err, ccobjects) {
	            		if(err){
			              	console.log('[SELECT ERROR] - ',err.message);
			              	dbFactory.closeConnection(conn);
			              	return failCallback(err);
			            }
			            else{
			            	resultObject.CCStatus=ccobjects;	
			            	var sql3 = "select CLRECORDS.member_id, CLRECORDS.clr_status, CLRECORDS.complete_time, "+
			            				 "CLPROJECT.cl_id, CLPROJECT.cl_type, CLPROJECT.cl_level, CLPROJECT.cl_name, CLPROJECT.cc_role "+
											"from (select * from CLRECORDS where CLRECORDS.member_id = "+memberId+") as CLRECORDS "+
											"RIGHT JOIN  CLPROJECT "+
											"ON CLPROJECT.cl_id = CLRECORDS.cl_id";
	            			conn.query(sql3,function (err, clobjects) {
	            				if(err){
					              	console.log('[SELECT ERROR] - ',err.message);
					              	dbFactory.closeConnection(conn);
					              	return failCallback(err);
					            }
					            resultObject.CLStatus=clobjects;
	            				dbFactory.closeConnection(conn);
	            				successCallback(resultObject);
	            			});
			            }
	            	});	
	            }
		   });
	}

	this.applyCC = function(clubId, memberId, ccId, successCallback, failCallback){
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "insert into CCRECORDS(cc_id,member_id) values("+ccId+" , "+memberId+")";
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

	this.applyCL = function(clubId, memberId, cLId, successCallback, failCallback){
			var dbFactory = new DBFactory();
			var conn = dbFactory.createConnection();
		 	var  sql = "insert into CLRECORDS(cl_id,member_id) values("+cLId+" , "+memberId+")";
		  	conn.query(sql,function (err, result) {
		            if(err){
		              failCallback(err);
		              console.log('[SELECT ERROR] - ',err.message);
		              dbFactory.closeConnection(conn);
		              return;
		            }
		            successCallback(result);
		     		dbFactory.closeConnection(conn);
		     		return result;
		   });
	}

}

module.exports = clubservice;



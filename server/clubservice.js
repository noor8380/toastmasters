var DBFactory = require('./database'); 

function ClubService(){
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
}

module.exports = ClubService;



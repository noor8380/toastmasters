
function JsonResult (){
	var status;
	var errMsg;
	var data;

	this.setData = function (status,abnormal,data){
		this.status = status;
		this.errMsg = errMsg;
		this.data=data;
	}

	this.getJson = function(response){
		var result = {
		  Status: this.status,
		  Abnormal: this.errMsg,
		  data: this.data
		}
		var string=JSON.stringify(result);  
		return string;
	}
	
}

module.exports = JsonResult;

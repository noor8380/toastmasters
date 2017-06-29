var mysql  = require('mysql');  

function DBFactory(){
    this.createConnection = function(){
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'root',              
          password : 'mysql',       
          port: '3306',                   
          database: 'toastmasters', 
      });
      connection.connect();
      return connection;
    };

    this.closeConnection = function(conn){
      conn.end();
    } 

}

module.exports = DBFactory;
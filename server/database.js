var mysql  = require('mysql');  

function DBFactory(){
    this.createConnection = function(){
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'root',              
          password : 'dcxaadmin',       
          port: '3306',                   
          database: 'toastmasters', 
          charset:'UTF8_GENERAL_CI',
      });
      connection.connect();
      return connection;
    };

    this.closeConnection = function(conn){
      conn.end();
    } 

}

module.exports = DBFactory;
var express = require('express');
var app = express();
var fs = require("fs");
var sql = require("mssql");


// config for your database
var config = {
 user: 'sac',
 password: 'sachin1',
 server: 'SACHINNEMADE', 
 database: 'MyDB' 
 };

app.get('/HelloService', function (req, res) {
 
      console.log( "Hello From Console" );
      res.end( "Hello From Response." );
 
})   
 
app.get('/listUsers', function (req, res) {
   fs.readFile( "D:/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})   

app.get('/HelloWorldService', function (req, res) {
  
  // connect to your database
 sql.connect(config, function (err) {
		 
		 if (err) console.log(err);

		 
		 // create Request object
		 var request = new sql.Request();
		 
		 // query to the database and get the data
		 request.query('select * from [User]', function (err, recordset) {
		 
		 if (err) console.log(err)

		 // send data as a response
		 res.send(recordset);
		 });
		 
		 
 })
 
 
    console.log( "Hello World!!!" );
    //res.end( "Hello World" );

})  

var server = app.listen(8030, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
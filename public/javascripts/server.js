// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');
var mysql = require('mysql');

var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
    certificate = fs.readFileSync('fakekeys/certificate.pem').toString();


var app = express();

app.use(express.static(__dirname));


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'magnandro123',
   database : 'mibase'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

connection.query('SELECT * FROM salas', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
  console.log('connected as id ' + connection.threadId);
});

https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
http.createServer(app).listen(8001);


console.log('running on https://localhost:8000 and http://localhost:8001');

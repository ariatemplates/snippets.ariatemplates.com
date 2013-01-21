var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');

var snippets = require('./routes/snippets');
var samples = require('./routes/samples');
var code = require('./routes/code');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});
app.use(express["static"](__dirname + '/public'));
app.use(app.router);


app.get('/', function(req, res) {
  res.send("(ಠ_ಠ)");
});
app.get('/snippets/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', snippets.onRequest);
app.get('/samples/github.com/:user/:repo/:folder([/\\-_a-zA-Z0-9]+)', samples.onRequest);
app.get('/code/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', code.onRequest);



var server = http.createServer(app);
server.listen(3000);

console.log("Server %s listening at http://localhost:3000/", process.title);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  process.exit(1);
});

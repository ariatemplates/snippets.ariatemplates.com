var express = require('express');

var snippets = require('./routes/snippets');
var samples = require('./routes/samples');
var code = require('./routes/code');

var app = express.createServer();

app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});
app.use(app.router);
app.use(express.static(__dirname + '/public'));


app.get('/snippets/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', snippets.onRequest);
app.get('/samples/github.com/:user/:repo/:folder([/\\-_a-zA-Z0-9]+)', samples.onRequest);
app.get('/code/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', code.onRequest);


process.title ="snippets.ariatemplates.com";
app.listen(3000);
console.log("Server %s listening at http://localhost:3000/", process.title);
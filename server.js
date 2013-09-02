var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var hljs = require('highlight.js');

var version = require('./package').version;

var snippets = require('./routes/snippets');
var samples = require('./routes/samples');
var code = require('./routes/code');

var Cache = require('./cache');

// Custom AT syntax file
hljs.LANGUAGES['at'] = require('./highlight.at.js')(hljs);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('version', version);
app.set('cache', new Cache({debug: ('development' === app.get('env'))}));

app.use(express["static"](__dirname + '/public'));
app.use(app.router);

app.configure('development', function() {
  app.set('logger', function() {
    console.log.apply(console, arguments);
  });
});

app.configure('production', function() {
  app.set('logger', function() {});
});

app.get('/', function(req, res) {
  if (req.xhr) {
    res.json({"Hello": "(ಠ_ಠ) Aria Templates Snippets Server"});
    return;
  }
  res.render("index");
});

app.get('/status', function(req, res) {
  var humanize = res.locals.humanize = require('humanize');
  res.render("status", {
    'host': (req.secure ? "https://" : "http://") + (req.header('x-forwarded-host') ? req.header('x-forwarded-host') : req.headers.host),
    'uptime': humanize.relativeTime(humanize.time() - process.uptime()),
    'mem': process.memoryUsage()
  });
});

app.get('/snippets/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', snippets(app));
app.get('/samples/github.com/:user/:repo/:folder([/\\-_a-zA-Z0-9]+)', samples(app));
app.get('/code/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', code(app));



var server = http.createServer(app);
server.listen(3000);

console.log("Server %s listening at http://localhost:3000/", process.title);

process.on('uncaughtException', function (err) {
  console.error("===== UNCAUGHTEXCEPTION =====");
  console.error(err.stack);
  process.exit(1);
});

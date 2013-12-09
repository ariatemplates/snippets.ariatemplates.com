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
var port = 3000;

// Custom AT syntax file
hljs.LANGUAGES['at'] = require('./highlight.at.js')(hljs);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('version', version);

app.set('port', port);


app.use(function(req, res, next) {
  res.locals.host = (req.secure ? "https://" : "http://") + (req.header('x-forwarded-host') ? req.header('x-forwarded-host') : req.headers.host);
  res.locals.atversion = req.query.atversion || "1.4.13";
  next();
});
app.use(express["static"](__dirname + '/public'));
app.use(app.router);

app.configure('development', function() {
  var documentation_path = process.argv[2];
  if (documentation_path) {
    var doc_path_normalized = path.normalize(documentation_path);
    var exists = fs.existsSync(doc_path_normalized);

    if (exists) {
      console.log('[Info] Documentation folder found at ' + doc_path_normalized);
      app.set('logger', function() {
        console.log.apply(console, arguments);
      });

      app.use('/documentation_code', express.static(doc_path_normalized));
    } else {
      console.log('[Error] No documentation folder found at ' + doc_path_normalized);
      process.exit(1);
    }

    app.set('cache', { get : function () { return false; } });
  } else {
    console.log('[Error] You need to specify the documentation-code folder path');
    process.exit(1);
  }
});

app.configure('production', function() {
  app.set('cache', new Cache());
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
    'uptime': humanize.relativeTime(humanize.time() - process.uptime()),
    'mem': process.memoryUsage()
  });
});

app.get('/snippets/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', snippets(app));
app.get('/samples/github.com/:user/:repo/:folder([/\\-_a-zA-Z0-9]+)', samples(app));
app.get('/code/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', code(app));



var server = http.createServer(app);
server.listen(port, function() {
  console.log("Server %s listening at http://localhost:%s/", process.title, server.address().port);
});

process.on('uncaughtException', function (err) {
  console.error("===== UNCAUGHTEXCEPTION =====");
  console.error(err.stack);
  process.exit(1);
});

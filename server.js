var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    hljs = require('highlight.js'),

    version = require('./package').version,

    snippets = require('./routes/snippets'),
    samples = require('./routes/samples'),
    code = require('./routes/code'),
    Cache = require('./cache'),

    port = 3000,
    versionPattern = "%version%";

// Custom AT syntax file
hljs.LANGUAGES['at'] = require('./highlight.at.js')(hljs);

var app = express();

// Common configuration
app.configure(function() {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('version', version);
  app.set('port', port);

  app.use(function(req, res, next) {
    res.locals.host = (req.secure ? "https://" : "http://") + (req.header('x-forwarded-host') ? req.header('x-forwarded-host') : req.headers.host);
    res.locals.atversion = req.query.atversion;
    res.locals.skin = req.query.skin;
    next();
  });
  app.use(express["static"](__dirname + '/public'));
  app.use(app.router);

});

// Development configuration
app.configure('development', function() {
  app.disable('view cache');
  app.set('cache', { get : function () { return false; } });
  app.set('logger', function() {
    console.log.apply(console, arguments);
  });


  var serveDirectory = function (url, commandLinePath, pathName) {
    var normalizedPath = path.normalize(commandLinePath);
    var pathExists = fs.existsSync(normalizedPath);
    if (pathExists) {
      console.log('[Info] %s found at %s.',pathName, normalizedPath);
      app.use(url, express.static(normalizedPath));
    } else {
      console.error('[Error] %s NOT found at %s.', pathName, normalizedPath);
      process.exit(1);
    }
  };

  // Node library for option parsing: https://github.com/substack/node-optimist
  // To change the path of either samples or framework: node server.js --dp path/to/samples --fp path/to/framework
  var argv = require('optimist')
    .alias('dp', 'documentationPath')
    .alias('fp', 'frameworkPath')
    .default('fp', false)
    .alias('fv', 'frameworkVersion')
    .default('fv', 'latest')
    .alias('ff', 'frameworkFileName')
    .default('ff', 'ariatemplates-%version%.js')
    .demand(['dp'])
    .usage('Usage: $0 --dp [string] -fp [string] --fv [string] --ff [string]')
    .argv;

  app.set('documentationPath', argv.documentationPath);
  app.set('frameworkPath', argv.frameworkPath);
  app.set('frameworkVersion', argv.frameworkVersion);
  app.set('frameworkFileName', argv.frameworkFileName);
  app.set('frameworkVersioned', argv.frameworkFileName.indexOf(versionPattern) !== -1);

  if (argv.documentationPath) {
    serveDirectory("/documentation_code", argv.documentationPath, "documentation folder");
  }

  if (argv.frameworkPath) {
    var localAriaPath = path.join(argv.frameworkPath, 'aria');
    serveDirectory("/aria", localAriaPath, "framework folder");
    if (argv.frameworkVersion !== 'latest') {
      var frameworkFile = path.join(localAriaPath, argv.frameworkFileName.replace(versionPattern, argv.frameworkVersion));
      if (!fs.existsSync(frameworkFile)) {
        console.log('[Error] Framework main file NOT found at %s.', frameworkFile);
        process.exit(1);
      }
    }
  }
});

// Production configuration
app.configure('production', function() {
  app.set('cache', new Cache());
  app.set('logger', function() {});
  app.set('frameworkVersion', 'latest');
});

// ------------------------------------------------------------------------------
// Routes
app.get('/', function(req, res) {
  if (req.xhr) {
    res.json({"Hello": "(ಠ_ಠ) Aria Templates Snippets Server"});
    return;
  }
  res.render("index");
});

app.get('/status', function(req, res) {
  var humanize = res.locals.humanize = require('humanize');

  var cacheInfo = { status: "No cache"} ,
      cache = app.get("cache");
  if (cache && cache.put) {
    cacheInfo = cache.stats();
  }

  res.render("status", {
    'uptime': humanize.relativeTime(humanize.time() - process.uptime()),
    'mem': process.memoryUsage(),
    'cache': cacheInfo
  });
});

app.get('/snippets/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', snippets(app));
app.get('/samples/github.com/:user/:repo/:folder([/\\-_a-zA-Z0-9]+)', samples(app));
app.get('/code/github.com/:user/:repo/:file([/\\-._a-zA-Z0-9]+.[a-zA-Z]+)', code(app));


// ------------------------------------------------------------------------------
// Server start
var server = http.createServer(app);
server.listen(port, function() {
  console.log("Server %s listening at http://localhost:%s/", process.title, server.address().port);
});

process.on('uncaughtException', function (err) {
  console.error("===== UNCAUGHTEXCEPTION =====");
  console.error(err.stack);
  process.exit(1);
});

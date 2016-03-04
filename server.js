var express  = require('express'),
    fs       = require('fs'),
    http     = require('http'),
    path     = require('path'),
    hljs     = require('highlight.js'),
    optimist = require('optimist'),
    request  = require('request'),

    version  = require('./package').version,

    snippets = require('./routes/snippets'),
    samples  = require('./routes/samples'),
    code     = require('./routes/code'),
    Cache    = require('./cache'),

    port     = 3000,
    versionPattern = "%version%";

var atJawsVersion = false;
try {
   atJawsVersion = require('./jaws-version.json').version;
} catch(e) {

} finally {
  if (atJawsVersion) {
    console.log('[Info] Specific Jaws version detected: %s.', atJawsVersion);
  }
}

// Custom AT syntax file
hljs.LANGUAGES['at'] = require('./highlight.at.js')(hljs);

var CDN_GET_LATEST_URL = "http://cdn.ariatemplates.com/versions";
var CDN_MAX_VERSION = false;

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
    res.locals.atJawsVersion = atJawsVersion;
    next();
  });
  app.use(express["static"](__dirname + '/public'));
  app.use(app.router);
});

function serveDirectory(url, commandLinePath, pathName) {
  var normalizedPath = path.normalize(commandLinePath);
  var pathExists = fs.existsSync(normalizedPath);
  if (pathExists) {
    console.log('[Info] %s found at %s.',pathName, normalizedPath);
    app.use(url, express.static(normalizedPath));
  } else {
    console.error('[Error] %s NOT found at %s.', pathName, normalizedPath);
    process.exit(1);
  }
}

// Development configuration
app.configure('development', function() {
  app.disable('view cache');
  app.set('cache', { get : function () { return false; } });
  app.set('logger', function() {
    console.log.apply(console, arguments);
  });

  // To change the path of either samples or framework: node server.js --dp path/to/samples --fp path/to/framework
  var argv = optimist
    .alias('dp', 'documentationPath')
    .alias('fp', 'frameworkPath')
    .default('fp', false)
    .alias('fv', 'frameworkVersion')
    .default('fv', 'latest')
    .alias('ff', 'frameworkFileName')
    .default('ff', 'ariatemplates-%version%.js')
    .demand(['dp'])
    .usage('Usage: $0 -dp [string] -fp [string] -fv [string] -ff [string]')
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

function getLatestVersionFromCDN(cb) {
  request.get(CDN_GET_LATEST_URL, function(error, response, body) {
    var versions = JSON.parse(body),
        max = versions.max,
        latest = [max[0], max[1], max.substr(2)].join(".");
    cb(latest);
  });
}

// Production configuration
app.configure('production', function() {
  app.set('cache', new Cache());
  app.set('logger', function() {});
  app.set('frameworkVersion', 'latest');

  var argv = optimist
    .alias('cdnsrc', 'cdnSourceFolder')
    .default('cdnsrc', false)
    .argv;

  app.set('cdnFromSource', false);

  // If the server is starting with a path to a cdn repo folder, we use it.
  // Otherwise we use the cdn over http.
  if (argv.cdnsrc) {
    app.set('cdnFromSource', true);
    app.get(/\/aria\/at(latest|(\d)[\-\.]?(\d)[\-\.]?(\d{1,2})).js/, function(req, res) {
      if (req.params[0] === "latest") {
        if (CDN_MAX_VERSION) {
          return res.redirect("/aria/ariatemplates-"+CDN_MAX_VERSION+".js");
        } else {
          getLatestVersionFromCDN(function(version) {
            CDN_MAX_VERSION = version;
            res.redirect("/aria/ariatemplates-"+version+".js");
          });
        }
      } else {
        var version = [req.params[1], req.params[2], req.params[3]].join(".");
        res.redirect("/aria/ariatemplates-"+version+".js");
      }

    });
    app.get(/\/aria\/css\/(at(?:flat)?skin)-latest\.js/, function(req, res) {
      if (CDN_MAX_VERSION) {
        res.redirect("/aria/css/"+req.params[0]+"-" + CDN_MAX_VERSION + ".js");
      } else {
        getLatestVersionFromCDN(function(version) {
          CDN_MAX_VERSION = version;
          res.redirect("/aria/css/"+req.params[0]+"-" + version + ".js");
        });
      }
    });
    serveDirectory("/aria", path.join(argv.cdnsrc, "/aria"), "aria source folder (cdn repo)");
  }
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

app.get('/updatelatest', function(req, res) {
  if (req.ip == '127.0.0.1') {
    getLatestVersionFromCDN(function(version) {
      CDN_MAX_VERSION = version;
    });
    res.send(200);
  } else {
    res.send(401);
  }
});

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

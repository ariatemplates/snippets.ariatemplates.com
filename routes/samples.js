var Url = require('url'),
    Https = require('https'),
    Uglify = require('uglify-js'),
    Yaml = require('js-yaml'),
    request = require('request'),
    Crypto = require('crypto');


var sampleReader = function(app) {
  var mode = app.get('env'),
      prod = mode == 'production',
      cache = app.get('cache'),
      logger = app.get('logger'),
      port = app.get('port');

  var request_options = {
    method: "GET",
    headers: {
      "User-Agent": "SnippetsAT/" + app.get('version') + " (http://snippets.ariatemplates.com/)"
    }
  };

  function middleware(req, res) {
    var key = req.url,
        user = req.params.user,
        repo = req.params.repo,
        folder = req.params.folder,
        branch = "master",
        query = Url.parse(req.url, true).query,
        hash = Crypto.createHash('md5').update(key).digest('hex').substr(0,8),
        url,
        cached;

    if (folder.indexOf("tree/") === 0) {
      branch = folder.split("/")[1];
      folder = folder.split("/").slice(2).join("/");
    }

    if (folder.substr(-1) === "/") {
      folder = folder.substring(0, folder.length - 1);
    }

    if (prod) {
      url = "https://raw.githubusercontent.com/" + user + "/" + repo + "/" + branch + "/" + folder + "/sample.yml";
    } else {
      url = "http://localhost:" + port + "/documentation_code/" + folder + "/sample.yml";
    }

    function processSample(data) {
      var yaml = Yaml.load(data);
      var sample_id = Crypto.createHash('md5').update(yaml.template).digest('hex').substr(0,8);
      var rootmap = "/code/github.com/" + user + "/" + repo + "/tree/" + branch + "/";
      var sample_folder = "/" + folder;
      if (query.skip) {
        var parts = sample_folder.substr(1).split("/");
        var prefix = parts.splice(0, query.skip);
        rootmap += prefix.join("/") + "/";
        sample_folder = "/" + parts.join("/");
      }

      return {
        'sample_id': "sample-"+sample_id,
        'title': yaml.title,
        'yaml': JSON.stringify(yaml),
        'rootmap': rootmap,
        'sample_folder': sample_folder
      };
    }

    // Main code execution
    logger("SAMPLE", "-", hash, "-", "Fetching", key);
    cached = cache.get(key);
    options = JSON.parse(JSON.stringify(request_options));
    options.url = url;

    if (prod && cached) {
      logger("SNIPPET - Already in cache");
      res.render("viewer", cached);
      request(options, function(error, response, body) {
        if (error) {
          logger("SAMPLE", "-", hash, "-", "Error:", error);
        }
        if (response.statusCode !== 200) {
          logger("SAMPLE", "-", hash, "-", "Error: Sample retrieval failed", key, error);
          return;
        }
        cache.put(key, processSample(body));
      });
    } else {
      request(options, function(error, response, body) {
        if (error) {
          logger("SAMPLE", "-", hash, "-", "Error:", error);
        }
        if (response.statusCode !== 200) {
          logger("SAMPLE", "-", hash, "-", "Error: Sample retrieval failed", key);
          res.render("error", {
            key: key
          });
          return;
        }
        if (prod) {
          res.render("viewer", cache.put(key, processSample(body)));
        } else {
          res.render("viewer", processSample(body));
        }
      });
    }
  }
  return middleware;
};

module.exports = sampleReader;

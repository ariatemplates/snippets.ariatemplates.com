var Url = require('url'),
    Https = require('https'),
    Uglify = require('uglify-js'),
    Yaml = require('js-yaml'),
    request = require('request'),
    Crypto = require('crypto');


var sampleReader = function(app) {
  var cache = app.get('cache'),
      logger = app.get('logger');

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
        url, cached,
        hash = Crypto.createHash('md5').update(key).digest('hex').substr(0,8);

    if (folder.indexOf("tree/") === 0) {
      branch = folder.split("/")[1];
      folder = folder.split("/").slice(2).join("/");
    }

    url = "https://raw.github.com/" + user + "/" + repo + "/" + branch + "/" + folder + "/sample.yml";

    function processSample(data) {
      var yaml = Yaml.load(data);
      var sample_id = Crypto.createHash('md5').update(yaml.template).digest('hex').substr(0,8);
      var rootmap = "/code/github.com/" + user + "/" + repo + "/tree/" + branch + "/";
      var sample_folder = "/" + (folder.substr(-1) === "/" ? folder.substr(0, folder.length - 1): folder );
      if (query.skip) {
        var parts = sample_folder.substr(1).split("/");
        var prefix = parts.splice(0, query.skip);
        rootmap += prefix.join("/") + "/";
        sample_folder = "/" + parts.join("/");
      }

      return {
        'ariatemplates': '1.4.10',
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
    if (cached) {
      logger("SNIPPET - Already in cache");
      res.render("viewer", cached);
      request(options, function(error, response, body) {
        if (response.statusCode !== 200) {
          logger("SAMPLE", "-", hash, "-", "Error: Sample retrieval failed", key, error);
          if (error) {
            logger("SAMPLE", "-", hash, "-", "Error:", error);
          }
          return;
        }
        cache.put(key, processSample(body));
      });
    } else {
      request(options, function(error, response, body) {
        if (response.statusCode !== 200) {
          logger("SAMPLE", "-", hash, "-", "Error: Sample retrieval failed", key);
          if (error) {
            logger("SAMPLE", "-", hash, "-", "Error:", error);
          }
          res.render("error", {
            key: key
          });
          return;
        }
        res.render("viewer", cache.put(key, processSample(body)));
      });
    }
  }

  return middleware;
};

module.exports = sampleReader;
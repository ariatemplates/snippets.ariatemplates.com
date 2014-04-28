var Url = require('url'),
    Path = require('path'),
    hljs = require('highlight.js'),
    request = require('request');


var codeHighlighter = function(app) {

  var request_options = {
    method: "GET",
    headers: {
      "User-Agent": "SnippetsAT/" + app.get('version') + " (http://snippets.ariatemplates.com/)"
    }
  };

  var mode = app.get('env'),
      prod = mode == 'production',
      cache = app.get('cache'),
      logger = app.get('logger'),
      port = app.get('port');

  function middleware(req, res) {
    var key = req.url,
        username = req.params.user,
        repo = req.params.repo,
        file = req.params.file,
        branch = "master",
        query = Url.parse(key, true).query,
        cached,
        url;

    if (file.indexOf("tree/") === 0) {
      branch = file.split("/")[1];
      file = file.split("/").slice(2).join("/");
    }
    if (prod) {
      url = "https://raw.githubusercontent.com/" + username + "/" + repo + "/" + branch + "/" + file;
    } else {
      url = "http://localhost:" + port + "/documentation_code/" + file;
    }

    function mimeType(path) {
      if (path.indexOf(".png") === (path.length - ".png".length)) {
        return "image/png";
      } else if (path.indexOf(".jpg") === (path.length - ".jpg".length)) {
        return "image/jpeg";
      } else if (path.indexOf(".gif") === (path.length - ".gif".length)) {
        return "image/gif";
      } else if (path.indexOf(".js") === (path.length - ".js".length)) {
        return "application/javascript";
      }
      return "text/html";
    }

    function handleImagesPath(text, user, repo, branch, file) {
      var path = file.split("/"), image_url;
      path.pop();
      if (prod) {
        image_url = "http://raw.githubusercontent.com/" + user + "/" + repo + "/" + branch + "/" + path.join("/");
      } else {
        image_url = "http://localhost:" + port + "/documentation_code/" + path.join("/");
      }

      text = text.replace(/url[\s]*\([\s"']*([^\)"']*)[\s"']*\)[\s]*/gm, function(match, url) {
        if (url.indexOf("${cssFolderPath}") === 0) {
          return "url(" + url.replace("${cssFolderPath}", image_url) + ") ";
        }
        if (url[0] == "/" || url.substr(0, 2) == "..") {
          return "url(" + image_url + url + ") ";
        }
      });
      return text;
    }

    function send(data) {
      res.header("Content-Type", mimeType(req.params.file));
      res.header("Content-Length", Buffer.byteLength(data));
      res.end(data);
    }

    function isCssTpl(path) {
      return path.indexOf(".tpl.css") === (path.length - ".tpl.css".length);
    }

    function highlight(data) {
      if (!query.highlight && isCssTpl(url)) {
        data = handleImagesPath(data, username, repo, branch, file);
      }
      if (query.highlight) {
        var lang = query.lang || "at";
        data = hljs.highlight(lang, data).value;
        data = "<pre class='prettyprint'><code class='"+ lang +"'>" + data + "</code></pre>";
      }
      return data;
    }

    function createSomethingWentWrong() {
      return '<pre class="prettyprint"><code class=""><span class="keyword">(ಠ_ಠ) I\'m sorry Dave, I\'m afraid something went bad with your snippet!</span></code></pre>';
    }

    function process(url, cb) {
      var options = JSON.parse(JSON.stringify(request_options));
      options.url = url;
      request(options, function(error, response, body) {
        if (response.statusCode !== 200) {
          cb("Status code: " + response.statusCode, createSomethingWentWrong());
          return;
        }
        cb(null, highlight(body));
      });
    }

    // Main code execution
    logger("CODE - Fetching %s", key);
    cached = cache.get(key);

    if (prod && cached) {
      logger("CODE - Already in cache");
      send(cached);

      logger("CODE - Regenerating cache item");
      cache.del(key);
      process(url, function(error, content) {
        if (error) {
          logger("CODE - Cache regeneration failed:", file);
          return logger(error);
        }
        cache.put(key, content);
      });
    } else {
      process(url, function(error, content) {
        if (prod) {
          cache.put(key, content);
        }
        send(content);
      });
    }
  }

  return middleware;
};

module.exports = codeHighlighter;

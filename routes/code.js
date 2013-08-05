var Url = require('url'),
    Path = require('path'),
    hljs = require('../highlight.js'),
    grabber = require('../grabber/grabber');

var cache = {};
var pending = {};
exports.onRequest = function(req, res){
  var user = req.params.user,
      repo = req.params.repo,
      file = req.params.file,
      url_parts = Url.parse(req.url, true),
      query = url_parts.query,
      url = "https://raw.github.com/" + user + "/" + repo + "/master/" + file,
      key = url;

  if (cache[key]) {
    var data = highlight(cache[key]);
    send(data);
    if (!pending[key]) {
      pending[key] = true;
      request(function (err, data) {
        delete pending[key];
        if (!err) {
          cache[key] = data;
        }
      });
    }
  } else {
    request(function (err, data) {
      if (err) {
        if (!(err instanceof Error)) {
          err = new Error(err);
        }
        // throw err;
        res.status(404).send('Not found');
        return;
      }
      cache[key] = data;
      data = highlight(data);
      send(data);
    });
  }

  function request(callback) {
    grabber.httpCat(url, callback);
  }

  function send(data) {
    res.header("Content-Type", mimeType(req.params.file));
    res.header("Content-Length", Buffer.byteLength(data));
    res.end(data);
  }

  function handleImagesPath(text, user, repo, file) {
    var path = file.split("/");
    path.pop();
    var image_url = "http://github.com/" + user + "/" + repo + "/raw/master/"+path.join("/")

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
    return "text/html"
  }

  function isCssTpl(path) {
    return path.indexOf(".tpl.css") === (path.length - ".tpl.css".length);
  }

  function highlight(data) {
    if (!query.highlight && isCssTpl(url_parts.pathname)) {
      data = handleImagesPath(data, user, repo, file);
    }
    if (query.highlight) {
      var lang = query.lang || "at";
      data = hljs.highlight(lang, data).value;
      data = "<pre class='prettyprint'><code class=''>" + data + "</code></pre>";
    }
    return data;
  }
};
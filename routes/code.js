var Url = require('url'),
    Https = require('https');

exports.onRequest = function(req, res){
  var user = req.params.user,
      repo = req.params.repo,
      file = req.params.file;

  var url = "https://raw.github.com/" + user + "/" + repo + "/master/" + file;
  httpCat(url, function(err, data) {
    if (err)  {
      throw err;
      return;
    }

    parts = Url.parse(url);
    if (isCssTpl(parts.pathname)) {
      data = handleImagesPath(data, user, repo, file);
    }
    res.header("Content-Type", mimeType(file));
    res.header("Content-Length", Buffer.byteLength(data));
    res.send(data);
  });

  function httpCat(url, callback) {
    var parts = Url.parse(url);
    Https.get(parts, function (response) {
      if (response.statusCode !== 200) {
        var err = new Error("Problem getting code from Github.\n" + url +
          "\n" + JSON.stringify(response.headers));
        if (response.statusCode === 404) {
          err.code = "ENOENT"
        }
        return callback(err);
      }
      response.setEncoding('utf8');
      var data = "";
      response.on('data', function(chunk) {
        data += chunk;
      });
      response.on('end', function() {
        callback(null, data);
      });
    }).on('error', function(err) {
      callback(err);
    });
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
};
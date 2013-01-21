var Url = require('url'),
    Https = require('https'),
    Uglify = require('uglify-js'),
    Yaml = require('js-yaml'),
    Crypto = require('crypto');

exports.onRequest = function(req, res){
  var user = req.params.user,
      repo = req.params.repo,
      folder = req.params.folder,
      query = Url.parse(req.url, true).query;

  var url = "https://raw.github.com/" + user + "/" + repo + "/master/" + folder + "/sample.yml";

  httpCat(url, function(err, data) {
    if (err)  {
      throw err;
      return;
    }
    var yaml = Yaml.load(data);
    var sample_id = Crypto.createHash('md5').update(yaml.template).digest('hex').substr(0,8);
    var rootmap = "/code/github.com/"+user+"/"+repo+"/";
    var sample_folder = "/" + (folder.substr(-1) === "/" ? folder.substr(0, folder.length - 1): folder );
    if (query.skip) {
      var parts = sample_folder.substr(1).split("/");
      var prefix = parts.splice(0, query.skip);
      rootmap += prefix.join("/") + "/";
      sample_folder = "/" + parts.join("/");
    }

    res.render("viewer", {
      'ariatemplates': '1.3.4',
      'sample_id': "sample-"+sample_id,
      'title': yaml.title,
      'yaml': JSON.stringify(yaml),
      'rootmap': rootmap,
      'sample_folder': sample_folder
    });
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
};

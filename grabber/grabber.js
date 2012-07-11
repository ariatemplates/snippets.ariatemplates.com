var Http = require('http'),
	Https = require('https'),
	Url = require('url');

exports.httpCat = function (url, callback) {
	//console.log("Loading remote file %s", url);
	var parts = Url.parse(url);

	(parts.protocol === "https:" ? Https : Http).get(parts, function (response) {
		if (response.statusCode !== 200) {
			var err = new Error("Problem getting code from github.\n" + url + "\n" + JSON.stringify(response.headers))
			if (response.statusCode === 404) {
				err.code = "ENOENT";
			}
			return callback(err);
		}
		response.setEncoding('utf8');
		var data = "";
		response.on('data', function (chunk) {
			data += chunk;
		});
		response.on('error', callback);
		response.on('end', function () {
			callback(null, data);
		});
	}).on("error", function (err) {
		callback(err);
	});
}
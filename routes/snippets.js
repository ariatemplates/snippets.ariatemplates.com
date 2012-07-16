var Url = require('url'),
	Path = require('path'),
	Uglify = require('uglify-js'),
	hljs = require('../highlight.js'),
	grabber = require('../grabber/grabber');

var cache = {};
var pending = {};
exports.onRequest = function(req, res){
	//console.log("\n\ntrying to fetch %s", req.url);
	var key =req.url;

	if (cache[key]) {
		//console.log("File already in cache");
		send(cache[key]);
		if (!pending[key]) {
			pending[key] = true;
			//console.log("invalidating the cache");
			request(function (err, js) {
				delete pending[key];
				if (!err) {
					cache[key] = js;
					//console.log("cache regenerated");
				}
			});
		}
	} else {
		request(function (err, js) {
			if (err) {
				if (!(err instanceof Error)) {
					err = new Error(err);
				}
				throw err;
				return;
			}
			cache[key] = js;
			send(js);
		});
	}

	function send(js) {
		res.header("Content-Type", "application/javascript");
		res.header("Content-Length", Buffer.byteLength(js));
		res.end(js);
	}

	function request(callback) {
		var query = Url.parse(req.url, true).query;
		var url = "https://raw.github.com/" + req.params.user + "/" + req.params.repo + "/master/" + req.params.file;

		grabber.httpCat(url, function (err, data) {
			if (err) return callback(err);

			var lines = data.split("\n");
			if (query.tag) {
				// extract code between tag				

				var arr = [];
				var re = new RegExp("\/{2} ?\/{2}#" + query.tag + "$", "i");
				var i = 0;
				var positions = [];

				lines.forEach(function (line) {
					i++;					
					if (line.match(re))
						positions.push(i);
				});

				if (positions.length == 2) {
					var start = positions[0];
					var end = positions[1];

					lines.length = end - 1;
					lines = lines.slice(start);
				}
				var code = lines.join("\n");
			} else {
				// skip tags and check for linestart and lineend
				var arr = [];
				lines.forEach(function (line) {
					if (line.match(/\/{2} ?\/{2}#.*/) == null)
						arr.push(line);					
				});
				var code = arr.join("\n");

				if (query.linestart && query.lineend) {
					lines = code.split("\n");
					var linestart = parseInt(query.linestart, 10) || 0;
					var lineend = parseInt(query.lineend, 10) || 0;
					if (lineend) lines.length = lineend;
					if (linestart) lines = lines.slice(linestart - 1);

					code = lines.join("\n");
				}
			}

			// Unindent block if needed
			if (query.outdent) {
				var min = Infinity;
				lines.forEach(function (line) {
					var match = line.match(/^ */);
					var i = match[0].length;
					if (i < min) min = i;
				});
				if (min && min < Infinity) {
					lines = lines.map(function (line) {
						return line.substr(min);
					});
				}
			}

			var supportedLang = ["1c", "actionscript", "apache", "at", "avrasm", "axapta", "bash", "clojure", "cmake", "coffeesc", "ript", "cpp", "cs", "css", "d", "delphi", "diff", "django", "dos", "erlang", "erlang-repl", "glsl", "go", "haskell", "http", "ini", "java", "javascript", "json", "lisp", "lua", "markdown", "matlab", "mel", "nginx", "objectivec", "parser3", "perl", "php", "profile", "python", "r", "rib", "rsl", "ruby", "rust", "scala", "smalltalk", "sql", "tex", "vala", "vbscript", "vhdl", "xml"];

			if ((query.lang) && (supportedLang.indexOf(query.lang) != -1)) {
				html = hljs.highlight(query.lang, code).value;
			} else {
				var extension = Path.extname(req.params.file);
				var html;

				switch(extension) {
					case '.js':
					case '.tpl':
					case '.tml':
						html = hljs.highlight("at", code).value;
						break;
					case '.css':
						if (req.params.file.indexOf(".tpl.css") != -1) {
							html = hljs.highlight("at", code).value;
						} else {
							html = hljs.highlight("css", code).value;
						}
						break;
					default:
						html = hljs.highlightAuto(code).value;
						break;
				}
			}
			var proxy_mode = req.header('x-forwarded-host'), url;
			if (proxy_mode) {
				url = "http://" + proxy_mode + req.url;
			} else {
				url = "http://" + req.headers.host + req.url;
			}
			var name = req.params.file;
			var js = createSnippet(url, name, html, query);
			callback(null, js);
		});
	}

	// Generate a custom compressed version of insertSnippet for the browser
	function createSnippet(url, name, html, query) {
		var compressedHTML = html.replace(/<span class=/g, "<@").replace(/span>/g, "@>");
		var extension = Path.extname(req.params.file);
		var codeClass = "";
		switch (extension) {
			case '.js': codeClass = "javascript"; break;
			case '.tpl':
			case '.tml': codeClass = "at"; break;
			case '.css': codeClass = "css"; break;
			case '.html': codeClass = "html"; break;
			default: codeClass = ""; break;
		}

		var js = "(" + insertSnippet.toString() + ")" +
		  "(" + JSON.stringify(url) + "," + JSON.stringify(name) + "," + JSON.stringify(compressedHTML) + "," + JSON.stringify(codeClass) + "," + JSON.stringify(query) + ");";
		var ast = Uglify.parser.parse(js);
		ast = Uglify.uglify.ast_mangle(ast);
		ast = Uglify.uglify.ast_squeeze(ast);
		js = Uglify.uglify.gen_code(ast);
		return js;
	}

	function insertSnippet(url, name, compressedHTML, codeClass, query) {
		function Html(html) { this.html = html; }
		function jsonML(json) {
			// Render strings as text nodes
			if (typeof json === 'string') return document.createTextNode(json);
			var node, first;
			for (var i = 0, l = json.length; i < l; i++) {
				var part = json[i];

				if (!node) {
					if (typeof part === 'string') {
						node = document.createElement(part);
						first = true;
						continue;
					} else {
						node = document.createDocumentFragment();
					}
				}

				// Except the first item if it's an attribute object
				if (first && typeof part === 'object' && Object.prototype.toString.call(part) !== '[object Array]' && !(part instanceof Html)) {
					for (var key in part) {
			        	if (part.hasOwnProperty(key)) {
			        		node.setAttribute(key, part[key]);
          				}
        			}
				} else {
					// Functions are a hack to embed pre-generated html
					if (part instanceof Html) {
						node.innerHTML = part.html;
					} else {
						node.appendChild(jsonML(part));
					}
				}
				first = false;
			}
			return node;
		};

		var tags = document.getElementsByTagName("script");

		var tmp = name.split("/");		
		tmp.splice(0,2);
		name = tmp.join("/");

		for (var i = 0, l = tags.length; i < l; i++) {
	    	var tag = tags[i];
	    	var src = tag.getAttribute('src');
	    	if (!(src && src.substr(src.length - url.length) === url)) continue;

	    	var html = compressedHTML.replace(/<@/g, "<span class=").replace(/@>/g, "span>");	    	
	    	var json = [];

	    	if (codeClass != "") {
	    		json = [
    					"div",
    					{"class":"snippet"},	    					
	      				["pre", {"class":"prettyprint"}, ["code", {"class": codeClass}, new Html(html)]]
	    			];
	    	} else {
    			json = [
    					"div",
    					{"class":"snippet"},
	      				["pre", {"class":"prettyprint"}, ["code", new Html(html)]]
	    			];
	    	}

	    	if (query && !query.noheader) {
	    		var snippetHeader = ["h5", {"class": "filename"}, ["strong", "FILE"], "/" + name];
	    		json.splice(2, 0, snippetHeader);
	    	}

	    	var snippet = jsonML(json);

	    	// Replace script tag with the snippet
	    	tag.parentNode.replaceChild(snippet, tag);

	    	break;
	  	}
	}
};
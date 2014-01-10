var Url = require('url'),
    Path = require('path'),
    Uglify = require('uglify-js'),
    hljs = require('highlight.js'),
    request = require('request'),
    Crypto = require('crypto');


var snippetBuilder = function(app) {

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
      port = app.get('port'),
      documentationPath = app.get('documentationPath');

  function middleware(req, res) {

    var key = req.url,
        username = req.params.user,
        repo = req.params.repo,
        file = req.params.file,
        branch = "master",
        query = Url.parse(key, true).query,
        cached,
        url,
        hash = Crypto.createHash('md5').update(key).digest('hex').substr(0,8);

    if (file.indexOf("tree/") === 0) {
      branch = file.split("/")[1];
      file = file.split("/").slice(2).join("/");
    }

    if (!documentationPath) {
      url = "https://raw.github.com/" + username + "/" + repo + "/" + branch + "/" + file;
    } else {
      url = "http://localhost:" + port + "/documentation_code/" + file;
    }

    function send(js) {
      var bytes = Buffer.byteLength(js);
      logger("SNIPPET", "-", hash, "-", "Sending Compiled Javascript:", bytes, "bytes");
      res.header("Content-Type", "application/javascript");
      res.header("Content-Length", bytes);
      res.end(js);
    }

    function getOriginalUrl() {
      var proxy_mode = req.header('x-forwarded-host'),
          protocol = req.secure ? "https://" : "http://",
          host = proxy_mode ? proxy_mode : req.headers.host;
      return protocol + host + req.url;
    }

    /**
     * Generate a piece of Javascript that will output an error message
     */
    function createSomethingWentWrong() {
      var url = getOriginalUrl(),
          name = req.params.file,
          compressedHTML = '<@"keyword">(&#3232;_&#3232;) I\'m sorry Dave, I\'m afraid something went bad with your snippet!</@>',
          query = { noheader: true },
          js = ["(",insertSnippet.toString(),")",
                "(",
                  JSON.stringify(url), ",",
                  JSON.stringify(name), ",",
                  JSON.stringify(compressedHTML), ",",
                  "''", ",",
                  JSON.stringify(query), ",",
                  JSON.stringify(0),
                ");"].join(""),
      ast = Uglify.parser.parse(js);
      ast = Uglify.uglify.ast_mangle(ast);
      ast = Uglify.uglify.ast_squeeze(ast);
      js = Uglify.uglify.gen_code(ast);
      return js;
    }

    function processSnippet(content) {
      var code = "", html = "", lines = content.split("\n"), tmp;

      // TAG Extraction
      if (query.tag) {

        var arr = [], positions = [],
            re = new RegExp("\/{2} ?\/{2}#" + query.tag),
            i = 0;

        lines.forEach(function (line) {
          i++;
          if (line.match(re)) {
            positions.push(i);
          }
        });

        if ((positions.length > 0) && (positions.length % 2 === 0)) {
          tmp = [];
          for (var j=0; j<positions.length; j=j+2) {
            var start = positions[j];
            var end = positions[j + 1];
            tmp = tmp.concat(lines.slice(start, end - 1), ["\n"]);
          }
          tmp.pop();  // to remove the last \n
          code = tmp.join("\n");
        }
      } else {
        // TAG Removal, also check for linestart and lineend
        var arr = [];
        lines.forEach(function (line) {
          if (line.match(/\/{2} ?\/{2}#.*/) == null) {
            arr.push(line);
          }

        });
        code = arr.join("\n");

        if (query.linestart && query.lineend) {
          lines = code.split("\n");
          var linestart = parseInt(query.linestart, 10) || 0;
          var lineend = parseInt(query.lineend, 10) || 0;
          if (lineend) {
            lines.length = lineend;
          }
          if (linestart) {
            lines = lines.slice(linestart - 1);
          }
          code = lines.join("\n");
        }
      }

      // INDENT: Unindent block if needed
      if (query.outdent) {
        lines = code.split("\n");

        // remove spaces
        var min = Infinity;
        lines.forEach(function (line) {
          if (line.trim().length > 0) {
            var match = line.match(/^([ \t]+).*/);
            var l = (match ? match[1].length : 0);
            if (l < min) {
              min = l;
            }
          }
        });
        if (min && min < Infinity) {
          lines = lines.map(function (line) {
            return line.substr(min);
          });
        }
        code = lines.join("\n");
      }

      // LINE NUMBERS
      var lineNumbers = 0;
      if (query.numbers) {
        lines = code.split("\n");
        if (lines && (lines.length > 0)) {
          lineNumbers = lines.length;
        }
      }

      var supportedLang = ["1c", "actionscript", "apache", "at", "avrasm", "axapta", "bash", "clojure", "cmake", "coffeesc", "ript", "cpp", "cs", "css", "d", "delphi", "diff", "django", "dos", "erlang", "erlang-repl", "glsl", "go", "haskell", "http", "ini", "java", "javascript", "json", "lisp", "lua", "markdown", "matlab", "mel", "nginx", "objectivec", "parser3", "perl", "php", "profile", "python", "r", "rib", "rsl", "ruby", "rust", "scala", "smalltalk", "sql", "tex", "vala", "vbscript", "vhdl", "xml"];

      if ((query.lang) && (supportedLang.indexOf(query.lang) != -1)) {
        html = hljs.highlight(query.lang, code).value;
      } else {
        switch(Path.extname(file)) {
          case '.js':
            if (file.indexOf("Script.js") != -1) {
              html = hljs.highlight("at", code).value;
            } else {
              html = hljs.highlight("javascript", code).value;
            }
            break;
          case '.tpl':
          case '.tml':
          case '.cml':
            html = hljs.highlight("at", code).value;
            break;
          case '.css':
            if (file.indexOf(".tpl.css") != -1) {
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
      return createSnippet(getOriginalUrl(), file, html, query, lineNumbers);
    }

    /**
     * Generate the correponding Javascript code that will output the highlighted snippet file
     */
    function createSnippet(url, name, html, query, lineNumbers) {
      var compressedHTML = html.replace(/<span class=/g, "<@").replace(/span>/g, "@>");
      var extension = Path.extname(req.params.file);
      var codeClass = "";
      switch (extension) {
        case '.js': codeClass = "javascript"; break;
        case '.tpl':
        case '.tml':
        case '.cml': codeClass = "at"; break;
        case '.css': codeClass = "css"; break;
        case '.html': codeClass = "html"; break;
        default: codeClass = ""; break;
      }

      var js = ["(", insertSnippet.toString(), ")",
                "(",
                  JSON.stringify(url), ",",
                  JSON.stringify(name), ",",
                  JSON.stringify(compressedHTML), ",",
                  JSON.stringify(codeClass), ",",
                  JSON.stringify(query), ",",
                  JSON.stringify(lineNumbers),
                ");"].join("");
      var ast = Uglify.parser.parse(js);
      ast = Uglify.uglify.ast_mangle(ast);
      ast = Uglify.uglify.ast_squeeze(ast);
      js = Uglify.uglify.gen_code(ast);
      return js;
    }

    function process(url, cb) {
      var options = JSON.parse(JSON.stringify(request_options));
      options.url = url;
      request(options, function(error, response, body) {
        if (response.statusCode !== 200) {
          cb("Status code: " + response.statusCode, createSomethingWentWrong());
          return;
        }
        cb(null, processSnippet(body));
      });
    }

    // Main code execution
    logger("SNIPPET", "-", hash, "-", "Fetching", key);
    cached = cache.get(key);

    if (prod && cached) {
      logger("SNIPPET", "-", hash, "-", "Already in cache");
      send(cached);

      logger("SNIPPET", "-", hash, "-", "Regenerating cache item");
      cache.del(key);
      process(url, function(error, content) {
        if (error) {
          logger("SNIPPET", "-", hash, "-", "Cache regeneration failed:", file);
          return logger("SNIPPET", "-", hash, "-", error);
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


module.exports = snippetBuilder;


// CLIENT SIDE CODE - NOT EXECUTED HERE
// Javascript method that is going to be executed on the client in the browser.
// We will uglify it here to obfuscate it before sending it back to the browser.
function insertSnippet(url, name, compressedHTML, codeClass, query, lineNumbers) {
  function Html(html) { this.html = html; }
  function jsonML(json, prefixTags, suffixTags) {
    // Render strings as text nodes
    if (typeof json === 'string') { return document.createTextNode(json); }
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
          var indentation = "&nbsp;&nbsp;&nbsp;&nbsp;"; // IE7 discards leading tabs
          node.innerHTML = prefixTags + part.html.replace(/\t/g, indentation) + suffixTags;
        } else {
          node.appendChild(jsonML(part, prefixTags, suffixTags));
        }
      }
      first = false;
    }
    return node;
  }

  var tags = document.getElementsByTagName("script");

  for (var i = 0, l = tags.length; i < l; i++) {
    var tag = tags[i];
    var src = tag.getAttribute('src');
    if (!(src && src.substr(src.length - url.length) === url)) { continue; }

    var html = compressedHTML.replace(/<@/g, "<span class=").replace(/@>/g, "span>"),
        markup = ["div", {"class":"snippet"}],
        // IE7 discards newlines unless we provide <PRE>-wrapped content to innerHTML
        // therefore it's better to provide it as a string
        prefixTags = '<pre class="prettyprint"><code class="' + (codeClass || '') + '">',
        suffixTags = '</code></pre>',
        preCode = ["div", new Html(html)],
        snippetHeader, divLineNumbers;

    markup.splice(2, 0, preCode);

    if (query && !query.noheader) {
      snippetHeader = ["h5", {"class": "filename"}, ["strong", "FILE"], "/" + name];
      if (query.linestart) {
        snippetHeader.push(["span", {"class": "lines" }, "L "+ query.linestart + "-" + query.lineend]);
      }
      markup.splice(2, 0, snippetHeader);
    }

    if (query && query.numbers) {
      var list = [], start = 1, end = lineNumbers;
      divLineNumbers = ["div", {"class": "linenumbers noheader"}];

      if (query && !query.noheader) {
        divLineNumbers = ["div", {"class": "linenumbers"}];
      }

      if (query.linestart) { start = parseInt(query.linestart, 10); end = (parseInt(query.lineend, 10) + 1); }
      for (var cont = start; cont < end; cont++) {
        list.push(["div", cont.toString()]);
      }

      divLineNumbers.push(list);

      if (query && !query.noheader) {
        markup.splice(3,0, divLineNumbers);
      } else {
        markup.splice(2,0, divLineNumbers);
      }
    }

    var snippet = jsonML(markup, prefixTags, suffixTags);

    // Replace script tag with the snippet
    tag.parentNode.replaceChild(snippet, tag);

    break;
  }
}

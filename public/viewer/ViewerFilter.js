Aria.classDefinition({
  $classpath: "viewer.ViewerFilter",
  $extends: "aria.core.IOFilter",
  $constructor: function(options) {
    this.$IOFilter.constructor.call(this);

    this.host = options.host;
    this.rootmap = options.rootmap;
    this.sample_folder = options.sample_folder;
  },
  $prototype: {
    onRequest: function(request) {
      if (request.sender == "viewer.ViewerCtrl") {
        request.url = this.rootmap + request.url.substr(1);
      } else {
        var parts = this.parseUri(request.url);
        if (parts.directory.indexOf('/samples/') === 0) {
          if (this.host.indexOf("http://localhost") === 0) {
            request.url = this.host;
          } else {
            request.url = (parts.protocol || "http") + "://" + parts.host;
            if (parts.port !== "") {
              request.url += ":" + parts.port;
            }
          }
          request.url += this.rootmap + parts.path.substr(1);
        }
      }
    },

    /**
     * Based on parseUri 1.2.2
     * (c) Steven Levithan <stevenlevithan.com>
     * http://blog.stevenlevithan.com/archives/parseuri
     * MIT License
     */
    parseUri : function(str) {
      var o   = {
            strictMode: false,
            key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
            q:   {
              name:   "queryKey",
              parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
              strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
              loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
          },
          m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
          uri = {},
          i   = 14;

      while (i--) uri[o.key[i]] = m[i] || "";

      uri[o.q.name] = {};
      uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
      });

      return uri;
    }
  }
});
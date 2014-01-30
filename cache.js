/**
 * Cache utility class with First In First Out mecanism
 */
var Cache = module.exports = (function() {
  var DEFAULT_CACHE_SIZE = 100,
      stack = [],
      cache = {},
      debug;

  var log = function() {
    if (debug) {
      console.log.apply(console, arguments);
    }
  };

  function Cache(options) {
    debug = (options && options.debug) || false;
    this.max_size = (options && options.size) || DEFAULT_CACHE_SIZE;
    log("[Cache]", "Initialized with size:", this.max_size);
  }

  Cache.prototype = {
    put: function(key, item) {
      var to_remove;
      if (this.size() >= this.max_size) {
        to_remove = stack.shift();
        log("[Cache]", "Size Limit Warning", "purging", to_remove);
        this.del(to_remove);
      }
      if (!cache[key]) {
        log("[Cache]", "adding item", key);
        stack.push(key);
      } else {
        log("[Cache]", "updating item", key);
      }
      cache[key] = item;
      return item;
    },

    get: function(key) {
      return cache[key] || null;
    },

    del: function(key) {
      stack.splice(stack.indexOf(key), 1)
      delete cache[key];
    },

    clear: function() {
      cache = {};
      stack = [];
      log("[Cache]", "Cache has been sucessfully flushed");
    },

    size: function() {
      return stack.length;
    },

    stats: function() {
      return {
        status: "Cache Info: " + this.size() + " items.",
        keys: JSON.stringify(stack, null, 2)
      }
    }
  };

  return Cache;
})();

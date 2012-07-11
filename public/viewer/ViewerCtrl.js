Aria.classDefinition({
	$classpath: 'viewer.ViewerCtrl',
	$extends: 'aria.templates.ModuleCtrl',
	$dependencies: [
		'aria.utils.Object',
		'viewer.json.JsonParser'
	],
	$implements: ['viewer.IViewerCtrl'],
	$constructor: function() {
		this.$ModuleCtrl.constructor.call(this);
		this.json_parser = viewer.json.JsonParser;
	},
	$desctructor: function() {
		this.$ModuleCtrl.$desctructor.call(this);
		this.json_parser = null;
	},
	$statics: {
		FILE_EXTENSION_MAP: [
			[/^.*\.(tpl|tpl\.css|tml)$/, 'at'],
			[/^.*\.(js)$/, 'javascript'],
			[/^.*\.(htm|html)$/, 'html5']
		],
		DEFAULT_VIEW: "result",
		SOURCE_FILENAME_PATTERN: "%FILENAME%"
	},
	$prototype: {
		$publicInterfaceName: 'viewer.IViewerCtrl',
		init: function(options, callback) {
			this.sample_path = options.sample_folder;
			this.initSample(options.yaml, callback);
		},


		/**
		 * Init the sample
		 * @param {Object} sample_cfg The sample configuration object
		 * @param {aria.core.Callback} callback An asynchronous callback to be called after the load is complete
		 */
		initSample: function(sample_cfg, callback) {
			if (sample_cfg.data) {
				this._data = sample_cfg.data;
				sample_cfg.data = true;
			} else {
				this._data = {};
			}
			this.$data = this.initDataModel(sample_cfg);
			this.$callback(callback);
			// We preload all source files
			this.preload();
		},

		/**
		 * Initialize the internal datamodel needed by the Module (Sample Viewer)
		 * This datamodel is attached to the standard one, under a custom namespace "sw"
		 * @param {Object} sample_cfg The initial sample config object
		 */
		initDataModel: function(sample_cfg) {
			var cfg = this._data["sw:cfg"] = sample_cfg;
			cfg.view = this.DEFAULT_VIEW;
			cfg.loading = true;
			return cfg;
		},

		/**
		 * Preload all the referenced source files in the 'sample.yml'
		 * @param {aria.core.Callback} callback An asynchronous callback to be called when all sources have been loaded
		 */
		preload: function(callback) {
			var sources = this.$data.sources,
				i = 0, l = sources.length;
			this.$data.loaded_sources = {};
			for(;i < l; i++) {
				// We only use the callback if we are in the last iteration
				if (i == (l - 1)) {
					this.preloadFile(sources[i], this.__getLanguage(sources[i]), callback);
				} else {
					this.preloadFile(sources[i], this.__getLanguage(sources[i]));
				}
			}
		},

		/**
		 * Preload a specific source file.
		 * Perform a server call to an action that will return the highlighted source code,
		 * using GeSHi.
		 * @param {String} file The file we want to highlight (relative local path to our sample)
		 * @param {String} language The language we want to use for the highlighting
		 * @param {aria.core.Callback} callback An asynchronous callback to be called when all sources have been loaded
		 */
		preloadFile: function(file, language, callback) {
			var path = this.sample_path + '/' + file;
			aria.core.IO.asyncRequest({
				sender: this.$classpath,
				url: path + "?highlight=true&lang=at",
				callback: {
					fn: this.__onFilePreloaded,
					scope: this,
					args: {
						path: path,
						file: file,
						callback: callback
					}
				}
			});
		},

		/**
		 * Internal callback executed after a source file is retrieved
		 * @private
		 */
		__onFilePreloaded: function(response, args) {
			var highlighted_source = response.responseText || "#ERROR# Something very very bad happened";
			if (args.file.indexOf('/') == -1) {
				highlighted_source = highlighted_source.replace(this.SOURCE_FILENAME_PATTERN, args.file);
			} else {
				var name = args.file.split('/').pop();
				highlighted_source = highlighted_source.replace(this.SOURCE_FILENAME_PATTERN, name);
			}

			aria.utils.Json.setValue(this.$data.loaded_sources, args.path, highlighted_source);
			var count = aria.utils.Object.keys(this.$data.loaded_sources).length;
			aria.utils.Json.setValue(this.$data, 'loaded_sources_count', count);
			if(count == this.$data.sources.length) {
				aria.utils.Json.setValue(this.$data, "loading", false);
			}
		},


		/**
		 * Internal method to imply a file programming language based on the extension
		 * @param {String} file_name The file name including the file extension
		 * @private
		 */
		__getLanguage: function(file_name) {
			for(var i=0, l = this.FILE_EXTENSION_MAP.length; i < l; i++) {
				var type = this.FILE_EXTENSION_MAP[i];
				if (type[0].test(file_name)) {
					return type[1];
				}
			}
			return "javascript";
		},

		/**
		 * Select the source to be displayed. Update the datamodel accordingly
		 * @param {String} file The file name the user just clicked on
		 * @public
		 */
		setSelectedSource: function(file) {
			var keys = aria.utils.Object.keys(this.$data.loaded_sources);
			this.$data.selected_source = false;

			for(var i = 0, l = keys.length; i < l; i++) {
				if (keys[i].indexOf(file) != -1) {
					this.$data.selected_source = keys[i];
				}
			}

		},

		/**
		 * Stringify a JSON javacript object using a custom version of Douglas Crockford JSON2 lib
		 * https://github.com/douglascrockford/JSON-js/
		 *	Generate HTML code containing compliant classnames to be used with GeSHi highlight engine
		 */
		stringify: function(json, replacer, indent) {
			return this.json_parser.stringify(json, replacer, indent);
		}
	}
});
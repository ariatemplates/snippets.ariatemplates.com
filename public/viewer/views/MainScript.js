Aria.tplScriptDefinition({
	$classpath: 'viewer.views.MainScript',
	$dependencies: [
		'aria.utils.Type'
	],
	$statics: {
		FILE_TYPE: [
			[/^.*\.tpl$/, "template"],
			[/^.*\.tml$/, "macrolib"],
			[/^.*Script\.js$/, "templatescript"],
			[/^.*\.tpl\.css$/, "csstemplate"],
			[/^I[A-Z].*\.js$/, "interface"],
			[/^.*Interface\.js$/, "interface"],
			[/^.*\.js$/, "controller"]
		],
		FILE_TYPE_NAME: {
			'template': "Template",
			'csstemplate': "Css Template",
			'templatescript': "Template Script",
			'macrolib': "Template Macro Library",
			'controller': "Controller",
			'interface': "Interface"
		}
	},
	$prototype: {
		$dataReady: function() {
			// Attach the SampleViewer datamodel under a "sw" namespace
			this.$data = this.data["sw:cfg"];
			this.url = window.location.toString();
		},

		/**
		 * Generate the classname for the sources file list.
		 */
		sourcesListOddEven: function(index) {
			return index % 2 == 0 ? "" : "odd";
		},

		/**
		 * Return the cssClass and the name of the given file according to its AriaTemplates type
		 * @param {String} file_name The file name
		 * @return {Object}
		 */
		getFileType: function(file_name) {
			for(var i=0, l = this.FILE_TYPE.length; i < l; i++) {
				var type = this.FILE_TYPE[i];
				if (type[0].test(file_name)) {
					return { cssClass: type[1], name: this.FILE_TYPE_NAME[type[1]] }
				}
			}
			return { cssClass: false, name: false }
		},

		/**
		 * Return the stringified representation of the sample datamodel.
		 * @param {Object} datamodel
		 * @return {String}
		 */
		indentDataModel : function (datamodel) {
			datamodel = aria.utils.Json.removeMetadata(this.data);
			delete datamodel["sw:cfg"];
			return this.moduleCtrl.stringify(datamodel, null, "&nbsp;&nbsp;");
		},

		/**
		 * Navigate to the 'Result' panel.
		 * @param {aria.templates.DomEventWrapper} evt
		 */
		run: function(evt) {
			aria.utils.Json.setValue(this.$data, "view", 'result');
		},

		/**
		 * Navigate to the 'Datamodel' panel.
		 * @param {aria.templates.DomEventWrapper} evt
		 */
		datamodel: function(evt) {
			aria.utils.Json.setValue(this.$data, "view", 'datamodel');
		},

		/**
		 * Navigate to the 'Sources' panel.
		 * @param {aria.templates.DomEventWrapper} evt
		 */
		sources: function(evt) {
			if (this.$data.sources.length == 1) {
				this.source(evt, this.$data.sources[0])
			} else {
				aria.utils.Json.setValue(this.$data, "view", 'sources');
			}
		},

		/**
		 * Navigate to the 'Source' panel.
		 * @param {aria.templates.DomEventWrapper} evt
		 */
		source: function(evt, file) {
			this.moduleCtrl.setSelectedSource(file);
			aria.utils.Json.setValue(this.$data, "view", 'source');
		},

		/**
		 * Returns the name of a file from a path
		 * @param {String} a path to a file
		 */
		getFileName: function(path) {
			return path.split("/").pop()
		}
	}
});
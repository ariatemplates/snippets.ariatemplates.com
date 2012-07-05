/**
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.InspectorDisplayScript",$prototype:{tplMouseOver:function(a,b){this.moduleCtrl.displayHighlight(b.templateCtxt.getContainerDiv());this.data.overModuleCtrl=b.moduleCtrl;this.mouseOver(a);this._refreshModulesDisplay();a.stopPropagation()},tplMouseOut:function(a){this.data.overModuleCtrl=null;this.mouseOut(a);this._refreshModulesDisplay();a.stopPropagation()},moduleMouseOver:function(a,b){this.data.overTemplates=b.outerTemplateCtxts;this.mouseOver(a);
this._refreshTemplatesDisplay();a.stopPropagation()},moduleMouseOut:function(a){this.data.overTemplates=null;this.mouseOut(a);this._refreshTemplatesDisplay();a.stopPropagation()},mouseOver:function(a){a.target.setStyle("background:#DDDDDD;")},mouseOut:function(a){a.target.setStyle("")},selectTemplate:function(a,b){this.data.selectedTemplate=b;this.$refresh()},selectModule:function(a,b){this.data.selectedModule=b;this.$refresh()},reloadTemplate:function(a,b){this.moduleCtrl.reloadTemplate(b.templateCtxt)},
refreshTemplate:function(a,b){this.moduleCtrl.refreshTemplate(b.templateCtxt)},onModuleEvent:function(a){a.name=="contentChanged"&&this.$refresh()},_refreshModulesDisplay:function(){this.$refresh({filterSection:"modules",macro:{name:"displayModules",args:[this.data.modules]}})},_refreshTemplatesDisplay:function(){this.$refresh({filterSection:"templates",macro:{name:"displayTemplates",args:[this.data.templates]}})}}});
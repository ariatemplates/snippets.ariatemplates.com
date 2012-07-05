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
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.TemplateInspectorScript",$prototype:{widgetMouseOver:function(a,b){var c=b.widget.getDom();c&&this.moduleCtrl.displayHighlight(c,"#FF6666");this.mouseOver(a);a.stopPropagation()},widgetMouseOut:function(a){this.mouseOut(a);a.stopPropagation()},mouseOver:function(a){a.target.setStyle("background:#DDDDDD;")},mouseOut:function(a){a.target.setStyle("")},displayWidgetDetails:function(a,b){this.data.selectedWidget=b;this.$refresh({filterSection:"widgets"})},
reloadTemplate:function(){this.moduleCtrl.reloadTemplate(this.data.templateCtxt)},reloadTemplateWithSrc:function(){this.moduleCtrl.reloadTemplate(this.data.templateCtxt,true)},refreshTemplate:function(){this.moduleCtrl.refreshTemplate(this.data.templateCtxt)},onModuleEvent:function(){},toggleSource:function(){this.data.showSource=!this.data.showSource;if(this.data.showSource){this.data.initialSource=true;this.data.source=this.moduleCtrl.getSource(this.data.templateCtxt.tplClasspath.replace(/\./g,
"/")+".tpl").value}this.$refresh()},editSource:function(a){if(this.data.initialSource){aria.utils.Json.setValue(this.data,"initialSource",false);this.$refresh({filterSection:"controls",macro:{name:"displayControls"}})}this.data.tplSrcEdit=a.target.getValue()},_refreshWidgetsDisplay:function(){this.$refresh({filterSection:"widgets"})}}});
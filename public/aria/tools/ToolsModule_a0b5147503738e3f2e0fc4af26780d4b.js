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
Aria.classDefinition({$classpath:"aria.tools.ToolsModule",$extends:"aria.templates.ModuleCtrl",$implements:["aria.tools.IToolsModule"],$constructor:function(){this.subModulesList=[{refpath:"inspector",classpath:"aria.tools.inspector.InspectorModule",display:"aria.tools.inspector.InspectorDisplay"},{refpath:"logger",classpath:"aria.tools.logger.LoggerModule",display:"aria.tools.logger.LoggerDisplay"}];this.bridge=null;this.$ModuleCtrl.constructor.call(this)},$prototype:{$publicInterfaceName:"aria.tools.IToolsModule",
init:function(b,c){this.bridge=b.bridge;for(var a=0,d=this.subModulesList.length;a<d;a++)if(!this.subModulesList[a].initArgs){this.subModulesList[a].initArgs={};this.subModulesList[a].initArgs.bridge=this.bridge}this.loadSubModules(this.subModulesList,{fn:this.onSubModulesReady,scope:this});this.$ModuleCtrl.init.call(this,b,c)},onSubModulesReady:function(){this.$raiseEvent("modulesReady")},onSubModuleEvent:function(){}}});
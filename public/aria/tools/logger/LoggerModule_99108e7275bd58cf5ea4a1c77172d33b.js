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
Aria.classDefinition({$classpath:"aria.tools.logger.LoggerModule",$extends:"aria.templates.ModuleCtrl",$dependencies:["aria.utils.Date"],$templates:["aria.tools.logger.LoggerDisplay"],$implements:["aria.tools.logger.ILoggerModule"],$constructor:function(){this.$ModuleCtrl.constructor.call(this);this.bridge=null;this._data={logs:[]};this.logsMaxLength=20},$destructor:function(){this.bridge.getAriaPackage().core.Log.removeAppender(this);this.$ModuleCtrl.$destructor.call(this)},$prototype:{$publicInterfaceName:"aria.tools.logger.ILoggerModule",
init:function(a,b){this.bridge=a.bridge;this.$assert(77,!!this.bridge);this.bridge.getAria().load({classes:["aria.core.Log"],oncomplete:{fn:function(){this.bridge.getAriaPackage().core.Log.addAppender(this);this.$callback(b)},scope:this}})},debug:function(a,b,c,d){this._log(aria.core.Log.LEVEL_DEBUG,a,b,c,d)},info:function(a,b,c,d){this._log(aria.core.Log.LEVEL_INFO,a,b,c,d)},warn:function(a,b,c,d){this._log(aria.core.Log.LEVEL_WARN,a,b,c,d)},error:function(a,b,c,d){this._log(aria.core.Log.LEVEL_ERROR,
a,b,c,d)},_log:function(a,b,c,d,f){var e=this._data.logs;e.unshift({type:a,className:b,msg:c,msgId:d,object:f,date:aria.utils.Date.format(new Date,"HH:mm:ss")})>this.logsMaxLength&&e.pop();this.$raiseEvent("newLog")},clean:function(){this._data.logs=[];this.$raiseEvent("newLog")}}});
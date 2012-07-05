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
Aria.classDefinition({$classpath:"aria.core.log.SilentArrayAppender",$constructor:function(){this.logs=[]},$destructor:function(){this.logs=[]},$prototype:{isEmpty:function(){return this.logs.length==0},empty:function(){this.logs=[]},getLogs:function(){return this.logs},setLogs:function(a){this.logs=a},_saveLog:function(a){this.logs.push(a)},debug:function(a,b,c,d){this._saveLog({level:"debug",msg:b,className:a,msgId:c,objOrErr:d})},info:function(a,b,c,d){this._saveLog({level:"info",msg:b,className:a,
msgId:c,objOrErr:d})},warn:function(a,b,c,d){this._saveLog({level:"warn",msg:b,className:a,msgId:c,objOrErr:d})},error:function(a,b,c,d){this._saveLog({level:"error",msg:b,className:a,msgId:c,objOrErr:d})}}});
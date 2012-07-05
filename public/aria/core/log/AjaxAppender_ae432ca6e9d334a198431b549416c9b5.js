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
Aria.classDefinition({$classpath:"aria.core.log.AjaxAppender",$dependencies:["aria.core.IO","aria.utils.Json"],$constructor:function(a,b,c){this._logStack=[];this._lastLogSent=0;this.minimumInterval=b||3E3;this.minimumLogNb=c||5;this.url=a},$prototype:{_stackLogObject:function(a,b,c){this._logStack.push({classpath:a,msg:b,level:c,time:(new Date).getTime()});this._processStack()},_processStack:function(){var a=(new Date).getTime();if(this._logStack.length>this.minimumLogNb&&a>this._lastLogSent+this.minimumInterval){this._lastLogSent=
(new Date).getTime();this._sendStack();this._logStack=[]}},_sendStack:function(){var a=aria.utils.Json.convertToJsonString({logs:this._logStack},{maxDepth:4});aria.core.IO.asyncRequest({sender:{classpath:this.$classpath},url:this.url,method:"POST",postData:a,callback:{fn:this._stackSent,scope:this}})},_stackSent:function(){},debug:function(a,b){this._stackLogObject(a,b,"debug")},info:function(a,b){this._stackLogObject(a,b,"info")},warn:function(a,b){this._stackLogObject(a,b,"warn")},error:function(a,
b,c,d){this._stackLogObject(a,b+this._formatException(d),"error")},_formatException:function(a){var b="";if(typeof a=="undefined"||a==null)return b;b="\nException";b+="\n---------------------------------------------------";if(a.fileName)b+="\nFile: "+a.fileName;if(a.lineNumber)b+="\nLine: "+a.lineNumber;if(a.message)b+="\nMessage: "+a.message;if(a.name)b+="\nError: "+a.name;if(a.stack)b+="\nStack:\n"+a.stack.substring(0,200)+" [...] Truncated stacktrace.";b+="\n---------------------------------------------------\n";
return b}}});
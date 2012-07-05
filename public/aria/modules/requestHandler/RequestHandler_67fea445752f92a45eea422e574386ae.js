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
Aria.classDefinition({$classpath:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$dependencies:["aria.modules.requestHandler.environment.RequestHandler"],$statics:{HTTP_ERRORS_GENERAL:"An uncatalogued HTTP error was generated",HTTP_ERRORS_400:"400 Bad Request: The request cannot be fulfilled due to bad syntax.",HTTP_ERRORS_401:"401 Unauthorized: Similar to 403 Forbidden, but specifically for use when authentication is possible but has failed or not yet been provided.",
HTTP_ERRORS_403:"403 Forbidden: The request was a legal request, but the server is refusing to respond to it.",HTTP_ERRORS_404:"404 Not Found: The requested resource could not be found but may be available again in the future.  Subsequent requests by the client are permissible.",HTTP_ERRORS_500:"500 Internal Server Error: A generic error message, given when no more specific message is suitable."},$constructor:function(){this._requestJsonSerializer=aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg();
aria.core.AppEnvironment.$on({changingEnvironment:{fn:this.__environmentUpdated,scope:this},environmentChanged:{fn:this.__environmentUpdated,scope:this}})},$destructor:function(){this._requestJsonSerializer=null},$prototype:{processSuccess:function(b,c,a){this.$callback(a,b)},processFailure:function(b,c,a){b=b.status;c={response:null,error:true};var d=this["HTTP_ERRORS_"+b];if(!d)d=this.HTTP_ERRORS_GENERAL;c.errorData={messageBean:{code:b,localizedMessage:d,type:"HTTPERROR"}};this.$callback(a,c)},
prepareRequestBody:function(b,c){return this.serializeRequestData(b,c)},serializeRequestData:function(b,c){var a=c?c.requestJsonSerializer:null,d=a?a.options:null;a=a?a.instance:null;if(!a){d=d||this._requestJsonSerializer.options;a=this._requestJsonSerializer.instance}return aria.utils.Json.convertToJsonString(b,aria.utils.Json.copy(d,true),a)},__environmentUpdated:function(){this._requestJsonSerializer=aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg()}}});
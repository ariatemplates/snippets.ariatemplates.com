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
//***MULTI-PART
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/RequestMgr.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.modules.RequestMgr",$dependencies:["aria.modules.queuing.SimpleSessionQueuing","aria.modules.RequestBeans","aria.modules.urlService.environment.UrlService","aria.modules.requestHandler.environment.RequestHandler"],$singleton:true,$events:{error:{description:"raised when an error occured either a server-side exception or a HTTP error (404, timeout)",properties:{requestUrl:"URL for the request (the URL may have already been modified by some other request filters).",
requestObject:"Request Object given to submitJsonRequest",httpError:"null if it is not an http error (i.e. a server side exception), otherwise contains information about http error, e.g.: { status: 404, error: 'Not found'}",errorData:"error structure to be displayed (if it's an HTTP error, it is filled by the framework client-side, or, if the error was server-side, it is the error messageBean returned in the <errors> tag)"}}},$constructor:function(){this.session={paramName:"jsessionid",id:""};this._params=
null;this.defaultActionQueuing=new aria.modules.queuing.SimpleSessionQueuing;this._idCounter=1;this._requestHandler=this._urlService=null;aria.core.AppEnvironment.$on({changingEnvironment:{fn:this.__environmentUpdated,scope:this},environmentChanged:{fn:this.__environmentUpdated,scope:this}})},$destructor:function(){this._params=null;if(this._urlService){this._urlService.$dispose();this._urlService=null}if(this._requestHandler){this._requestHandler.$dispose();this._requestHandler=null}if(this.defaultActionQueuing){this.defaultActionQueuing.$dispose();
this.defaultActionQueuing=null}},$statics:{ERROR_STATUS:-1,EXECUTE_STATUS:0,QUEUE_STATUS:1,DISCARD_STATUS:2,INVALID_REQUEST_OBJECT:"Provided request object does not match aria.modules.RequestBeans.RequestObject.",FILTER_CREATION_ERROR:"An error occured while creating a Request filter:\nclass: %1",INVALID_BASEURL:"The base URL defined in the RequestMgr object is empty or invalid - please check: \nurl: %1",CALLBACK_ERROR:"An error occured in the Request manager while processing the callback function.",
INVALID_URL:"Url for request is invalid: %1"},$prototype:{addParam:function(a,b){if(b==null)return this.removeParam(a);if(this._params==null)this._params=[];for(var c=0,d=this._params.length;c<d;c++){var e=this._params[c];if(e.name===a){e.value=encodeURIComponent(b);return}}this._params.push({name:a,value:encodeURIComponent(b)})},getParam:function(a){if(a==null||this._params==null)return null;for(var b=0,c=this._params.length;b<c;b++){var d=this._params[b];if(d.name===a)return d.value}return null},
removeParam:function(a){if(a==null)this._params=null;if(this._params!=null)for(var b=0,c=this._params.length;b<c;b++)if(this._params[b].name===a){this._params.splice(b,1);c--}},submitJsonRequest:function(a,b,c){try{aria.core.JsonValidator.normalize({json:a,beanName:"aria.modules.RequestBeans.RequestObject"},true)}catch(d){this.$logError(this.INVALID_REQUEST_OBJECT,null,a);return this.DISCARD_STATUS}if(!a.actionQueuing)a.actionQueuing=this.defaultActionQueuing;if(!a.session)a.session=this.session;
if(!a.requestHandler)a.requestHandler=this._requestHandler;return a.actionQueuing.pushRequest(a,b,c)},__getHandlersDependencies:function(){var a=[],b=aria.modules.urlService.environment.UrlService;if(!this._urlService){b=b.getUrlServiceCfg();a.push(b.implementation)}if(!this._requestHandler){b=aria.modules.requestHandler.environment.RequestHandler.getRequestHandlerCfg();a.push(b.implementation)}return a},sendJsonRequest:function(a,b,c){b={requestObject:a,jsonData:b,data:null,method:"POST"};var d=
this._idCounter++,e=this.__getHandlersDependencies();Aria.load({classes:e,oncomplete:{fn:this._onDependenciesReady,scope:this,args:{req:b,cb:c,id:d,session:a.session,actionQueuing:a.actionQueuing,requestHandler:a.requestHandler}}});return d},_onDependenciesReady:function(a){var b=a.req,c=this.createRequestUrl(b.requestObject,a.session);if(c==="")return this.$logError(this.INVALID_URL,[""]);b.url=c;this._callAsyncRequest(a)},_callAsyncRequest:function(a){var b=a.req;if(a.requestHandler==null)a.requestHandler=
this.__getRequestHandler();b.data=b.data==null&&b.method=="POST"?a.requestHandler.prepareRequestBody(b.jsonData,b.requestObject):b.data;var c={classpath:this.$classpath,requestObject:b.requestObject,requestData:b.jsonData,responseData:null,responseErrorData:null};a={sender:c,url:b.url,method:b.method,postData:b.data,callback:{fn:this._onresponse,onerror:this._onresponse,scope:this,args:{requestObject:b.requestObject,senderObject:c,cb:a.cb,id:a.id,session:a.session,actionQueuing:a.actionQueuing,requestHandler:a.requestHandler}}};
if(b.postHeader)a.postHeader=b.postHeader;aria.core.IO.asyncRequest(a)},_onresponse:function(a,b){var c=b.requestObject,d=b.actionQueuing,e=b.id,f=b.senderObject;d&&d.handleNextRequest(e);b.res={requestUrl:a.url,requestObject:c,responseXML:a.responseXML,responseText:a.responseText,responseJSON:a.responseJson,status:a.status,error:a.error,data:f.responseData,errorData:f.responseErrorData};this._processOnResponse(b)},_processOnResponse:function(a){var b=a.res,c=a.requestHandler;b.error?c.processFailure({error:b.error,
status:b.status},{url:a.res.url,session:a.session,requestObject:a.requestObject},{fn:this._callRequestCallback,scope:this,args:a}):c.processSuccess({responseXML:b.responseXML,responseText:b.responseText,responseJSON:b.responseJson},{url:b.url,session:a.session,requestObject:a.requestObject},{fn:this._callRequestCallback,scope:this,args:a})},_callRequestCallback:function(a,b){var c=b.res;if(c.errorData)a.error=true;if(c.data)a.data=c.data;if(c.errorData)a.errorData=c.errorData;if(a.error){var d={name:"error",
requestUrl:c.requestUrl,requestObject:b.requestObject,errorData:a.errorData};if(c.error)d.httpError={error:c.error,status:c.status};this.$raiseEvent(d)}this.$callback(b.cb,a,this.CALLBACK_ERROR)},createRequestUrl:function(a,b){var c=a.urlService;c||(c=this.__getUrlService());this.$assert(434,c!=null);if(!b)b=this.session;var d=this.__extractActionName(a.actionName),e=a.moduleName.replace(/\./g,"/");c=c.createActionUrl(e,d.name,b.id);if(!c){this.$logError(this.INVALID_BASEURL,[c]);return""}c=this.__appendActionParameters(c,
d.params);return this.__appendGlobalParams(c,this._params)},createI18nUrl:function(a,b,c){var d=aria.modules.urlService.environment.UrlService.getUrlServiceCfg();Aria.load({classes:[d.implementation],oncomplete:{fn:this.__onI18nReady,scope:this,args:{moduleName:a,locale:b,callback:c}}})},__onI18nReady:function(a){var b=this.__getUrlService();this.$assert(595,b!=null);b=b.createI18nUrl(a.moduleName,this.session.id,a.locale);b=this.__appendGlobalParams(b,this._params);a.callback.args=a.callback.args||
{};a.callback.args.full=b;this.$callback(a.callback)},__appendGlobalParams:function(a,b){if(!b||b.length===0)return a;for(var c=[],d=0,e=b.length;d<e;d+=1){var f=b[d];c.push(f.name+"="+f.value)}c=c.join("&");return this.__appendActionParameters(a,c)},__appendActionParameters:function(a,b){a=a||"";if(!b)return a;var c=a.indexOf("?");a+=c>-1?"&":"?";return a+b},__extractActionName:function(a){a=a||"";var b=a.indexOf("?"),c={name:"",params:""};if(b<0)c.name=a;else c={name:a.substring(0,b),params:a.substring(b+
1)};return c},__getUrlService:function(){if(!this._urlService){var a=aria.modules.urlService.environment.UrlService.getUrlServiceCfg(),b=a.args[0],c=a.args[1];this._urlService=new (Aria.getClassRef(a.implementation))(b,c)}return this._urlService},__getRequestHandler:function(){if(!this._requestHandler){var a=aria.modules.requestHandler.environment.RequestHandler.getRequestHandlerCfg();this._requestHandler=Aria.getClassInstance(a.implementation,a.args)}return this._requestHandler},__environmentUpdated:function(a){if(a.name==
"environmentChanged"){if(this._urlService){this._urlService.$dispose();this._urlService=null}if(this._requestHandler){this._requestHandler.$dispose();this._requestHandler=null}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/RequestBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.modules.RequestBeans",$description:"Definition of the JSON beans used to set application variables",$namespaces:{json:"aria.core.JsonTypes",env:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans"},$beans:{RequestObject:{$type:"json:Object",$description:"Request Object passed to submitJsonRequest",$restricted:false,$properties:{moduleName:{$type:"json:String",$description:"The classpath of the enclosing module, i.e. myApp.moduleName",$mandatory:true},
actionName:{$type:"json:String",$description:"The name of the target action, including an optional HTTP Query String",$mandatory:true},session:{$type:"json:ObjectRef",$description:"Session details"},actionQueuing:{$type:"json:ObjectRef",$description:"It creates an queue for all request"},requestHandler:{$type:"json:ObjectRef",$description:"Default request handler configuration"},urlService:{$type:"json:ObjectRef",$description:"Store the reference of Url Service class implementation"},requestJsonSerializer:{$type:"env:RequestJsonSerializerCfg",
$description:"JSON serializer settings that have to be used for this request"},postHeader:{$type:"json:String",$description:"Header 'Content-type' to be used for POST requests."}}},SuccessResponse:{$type:"json:Object",$description:"Describe the response from the server if no communication error happened.",$properties:{responseText:{$type:"json:String",$description:"Response from the server as a string."},responseXML:{$type:"json:ObjectRef",$description:"If available, response as an XML tree."},responseJSON:{$type:"json:ObjectRef",
$description:"If available, response as a javascript object."}}},FailureResponse:{$type:"json:Object",$description:"Describe error that happened during the call to the server.",$properties:{status:{$type:"json:Integer",$description:"Status of the server response: 200, 404, 503, ...",$mandatory:true},error:{$type:"json:String",$description:"Error message from the framework"}}},Request:{$type:"json:Object",$description:"Details on the original request.",$properties:{url:{$type:"json:String",$description:"Final url for the call"},
session:{$type:"json:ObjectRef",$description:"Session details"},requestObject:{$type:"RequestObject",$description:"Request Object passed to submitJsonRequest"}}},ProcessedResponse:{$type:"json:Object",$description:"Response after processing, containing data ready to be used by the requester. Other properties can be defined by the handler if needed.",$restricted:false,$properties:{response:{$type:"json:ObjectRef",$description:"Processed data from the response"},error:{$type:"json:Boolean",$description:"Indicates if this server response contains error (HTTP errors, server side errors, parsing errors,...)"},
errorData:{$type:"json:ObjectRef",$description:"Details regarding the error that occured, including a messageBean property with the error message."}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/queuing/SimpleSessionQueuing.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.modules.queuing.SimpleSessionQueuing",$constructor:function(){this._idSessionMap={};this._sessionQueues={}},$statics:{NO_SESSION_ID_KEY:"1"},$destructor:function(){this._idSessionMap=null;for(var a in this._sessionQueues)this._sessionQueues.hasOwnProperty(a)&&delete this._sessionQueues[a];this._sessionQueues=null},$prototype:{pushRequest:function(a,c,b){var e,d=a.session.id;if(!d)d=this.NO_SESSION_ID_KEY;this._sessionQueues[d]||(this._sessionQueues[d]=[]);e=
this._sessionQueues[d];a.actionQueuing=this;if(e.length>0){e.push({requestObject:a,jsonData:c,cb:b});return aria.modules.RequestMgr.QUEUE_STATUS}else{a=this._sendRequest(a,c,b);if(a===aria.modules.RequestMgr.ERROR_STATUS)return a;else{this._idSessionMap[a]=d;e.push(a);return aria.modules.RequestMgr.EXECUTE_STATUS}}},handleNextRequest:function(a){if(this._idSessionMap){var c=this._idSessionMap[a];if(c){delete this._idSessionMap[a];var b=this._sessionQueues[c];this.$assert(99,b&&b.length>0);this.$assert(100,
b[0]===a);for(b.splice(0,1);b.length>0;){a=b[0];a=this._sendRequest(a.requestObject,a.jsonData,a.cb);if(a===aria.modules.RequestMgr.ERROR_STATUS)b.splice(0,1);else{this._idSessionMap[a]=c;b[0]=a;break}}}}},_sendRequest:function(a,c,b){return aria.modules.RequestMgr.sendJsonRequest(a,c,b)}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/environment/Environment.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.modules.environment.Environment",$dependencies:["aria.modules.requestHandler.environment.RequestHandler","aria.modules.environment.EnvironmentCfgBeans"],$singleton:true,$extends:"aria.core.environment.EnvironmentBase",$prototype:{_cfgPackage:"aria.modules.environment.EnvironmentCfgBeans.AppCfg",getRequestJsonSerializerCfg:function(){this.$logWarn("The getRequestJsonSerializerCfg on this object is deprecated. Please use aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg instead.");
return aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg()}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/environment/EnvironmentCfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.modules.environment.EnvironmentCfgBeans",$description:"A definition of the JSON beans used to set the environment settings.",$namespaces:{json:"aria.core.JsonTypes"},$beans:{AppCfg:{$type:"json:Object",$description:"Application environment variables",$restricted:false,$properties:{requestJsonSerializer:{$type:"RequestJsonSerializerCfg",$description:"Default request handler configuration",$default:{options:{encodeParameters:true,keepMetadata:false}}}}},RequestJsonSerializerCfg:{$type:"json:Object",
$description:"Settings related to the JSON serializer used to convert JSON data to a string before sending a request.",$properties:{instance:{$type:"json:ObjectRef",$description:'Instance of a class that implements a "serialize" method'},options:{$type:"json:Map",$description:'Argument passed to the "serialize" method of the serializer',$contentType:{$type:"json:MultiTypes",$description:"Option to pass as argument to the serialize method of the serializer"},$default:null}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/urlService/environment/UrlService.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.modules.urlService.environment.UrlService",$dependencies:["aria.modules.urlService.environment.UrlServiceCfgBeans"],$extends:"aria.core.environment.EnvironmentBase",$singleton:true,$prototype:{_cfgPackage:"aria.modules.urlService.environment.UrlServiceCfgBeans.AppCfg",getUrlServiceCfg:function(){return aria.utils.Json.copy(this.checkApplicationSettings("urlService"))}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/urlService/environment/UrlServiceCfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.modules.urlService.environment.UrlServiceCfgBeans",$description:"A definition of the JSON beans used to set the environment settings.",$namespaces:{json:"aria.core.JsonTypes"},$beans:{AppCfg:{$type:"json:Object",$description:"Application environment variables",$restricted:false,$properties:{urlService:{$type:"UrlServiceCfg",$description:"Default URL creation strategy configuration",$default:{implementation:"aria.modules.urlService.PatternURLCreationImpl",args:["${moduleName}/${actionName}",
"${moduleName}"]}}}},UrlServiceCfg:{$type:"json:Object",$description:"Settings related to the URL creation strategy",$properties:{implementation:{$type:"json:PackageName",$description:"Classpath of the URL creation strategy implementation",$default:null},args:{$type:"json:Array",$description:"Arguments passed to the implementation's constructor",$default:[],$contentType:{$type:"json:String",$description:"Base URL used for pattern replacement"}}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/requestHandler/environment/RequestHandler.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.modules.requestHandler.environment.RequestHandler",$dependencies:["aria.modules.requestHandler.environment.RequestHandlerCfgBeans"],$singleton:true,$extends:"aria.core.environment.EnvironmentBase",$prototype:{_cfgPackage:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans.AppCfg",getRequestHandlerCfg:function(){return aria.utils.Json.copy(this.checkApplicationSettings("requestHandler"))},getRequestJsonSerializerCfg:function(){return this.checkApplicationSettings("requestJsonSerializer")}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/modules/requestHandler/environment/RequestHandlerCfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans",$description:"A definition of the JSON beans used to set the environment settings.",$namespaces:{json:"aria.core.JsonTypes"},$beans:{AppCfg:{$type:"json:Object",$description:"Application environment variables",$restricted:false,$properties:{requestHandler:{$type:"RequestHandlerCfg",$description:"Default request handler configuration",$default:{implementation:"aria.modules.requestHandler.APFXMLRequestHandler"}},
requestJsonSerializer:{$type:"RequestJsonSerializerCfg",$description:"Default request handler configuration",$default:{options:{encodeParameters:true,keepMetadata:false}}}}},RequestHandlerCfg:{$type:"json:Object",$description:"Settings related to the request handler used by the request manager by default",$properties:{implementation:{$type:"json:PackageName",$description:"Classpath of the URL creation strategy implementation",$default:null},args:{$type:"json:ObjectRef",$description:"Arguments passed to the implementation's constructor"}}},
RequestJsonSerializerCfg:{$type:"json:Object",$description:"Settings related to the JSON serializer used to convert JSON data to a string before sending a request.",$properties:{instance:{$type:"json:ObjectRef",$description:'Instance of a class that implements a "serialize" method'},options:{$type:"json:Map",$description:'Argument passed to the "serialize" method of the serializer',$contentType:{$type:"json:MultiTypes",$description:"Option to pass as argument to the serialize method of the serializer"},
$default:null}}}}});
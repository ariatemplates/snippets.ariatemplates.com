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
Aria.classDefinition({$classpath:"aria.modules.requestHandler.XMLRequestHandler",$extends:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$statics:{MIMETYPE_ERROR:"Response type is badly configured, it should have returned a xml response."},$prototype:{processSuccess:function(a,b,c){a=!a.responseXML||a.responseXML&&!a.responseXML.documentElement?{response:null,error:true,errorData:{messageBean:{localizedMessage:this.MIMETYPE_ERROR,type:"TYPEERROR"}}}:
this.processXMLDocument(a.responseXML.documentElement,b);this.$callback(c,a)},processXMLDocument:function(a){return{response:a}}}});
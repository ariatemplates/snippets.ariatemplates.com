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
Aria.classDefinition({$classpath:"aria.core.IOFilter",$constructor:function(a){this.requestDelay=a?a.requestDelay:null;this.responseDelay=a?a.responseDelay:null},$statics:{FILTER_REQ_ERROR:"An error occured in an IO filter:\ncall stack: onRequest\nclass: %1",FILTER_RES_ERROR:"An error occured in an IO filter:\ncall stack: onResponse\nclass: %1"},$prototype:{onRequest:function(a){if(this.requestDelay!=null)a.delay+=this.requestDelay},onResponse:function(a){if(this.responseDelay!=null)a.delay+=this.responseDelay},
setJsonPostData:function(a,b){a.postData="data="+aria.utils.Json.convertToJsonString(b,{encodeParameters:true})},redirectToFile:function(a,b,c){if(b){a.url=aria.core.DownloadMgr.resolveURL(b,true);if(c!==true)a.url=aria.core.DownloadMgr.getURLWithTimestamp(a.url,true);a.method="GET";a.jsonp=null}},__onRequest:function(a){try{this.onRequest(a)}catch(b){this.$logError(this.FILTER_REQ_ERROR,[this.$classpath],b)}},__onResponse:function(a){try{this.onResponse(a)}catch(b){this.$logError(this.FILTER_RES_ERROR,
[this.$classpath],b)}}}});
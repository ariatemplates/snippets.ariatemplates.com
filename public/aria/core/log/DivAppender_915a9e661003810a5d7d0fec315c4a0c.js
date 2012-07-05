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
Aria.classDefinition({$classpath:"aria.core.log.DivAppender",$constructor:function(a){this.div=a;a.innerHTML="<h2>Logs</h2>";this.groupSpacer=""},$destructor:function(){this.div=null},$prototype:{_inspectObject:function(a){var b="";if(a&&typeof a=="object"){b+="<blockquote>";for(var c in a)if(typeof a[c]!=="function")b+=c+" > "+a[c]+"<br />";b+="</blockquote>"}return b},_escapeHTML:function(a){return a.replace(/</g,"&lt;")},_showSeparator:function(){},debug:function(a,b,c,d){this._showSeparator();
this._write("<p>DEBUG</p><p>"+this.groupSpacer+"<em>"+a+"</em> "+this._escapeHTML(b)+"</p>");this._write(this._inspectObject(d));this._scrollDown()},info:function(a,b,c,d){this._showSeparator();this._write("<p style='background-color:#ECEFF4;'>INFO</p><p>"+this.groupSpacer+"<em>"+a+"</em> "+this._escapeHTML(b)+"</p>");this._write(this._inspectObject(d));this._scrollDown()},warn:function(a,b,c,d){this._showSeparator();this._write("<p style='background-color:orange;'>WARN</p><p>"+this.groupSpacer+"<em>"+
a+"</em> "+this._escapeHTML(b)+"</p>");this._write(this._inspectObject(d));this._scrollDown()},error:function(a,b,c,d){this._showSeparator();this._write("<p style='background-color:red;'>ERROR</p><p>"+this.groupSpacer+"<em>"+a+"</em> "+this._escapeHTML(b)+"</p>");this._write(this._inspectObject(d));this._scrollDown()},_scrollDown:function(){this.div.style.scrollTop=1E7},_write:function(a){this.div.innerHTML+=a}}});
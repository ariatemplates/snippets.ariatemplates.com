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
(function(){function g(){d||(d=new aria.utils.json.JsonSerializer);var a=b.getAttribute("kMap");return a?d.parse(a):{}}function i(a,c){if(a)e[c]=a;else delete e[c];b.setAttribute("kMap",d.serialize(e));b.save("JSONPersist")}function h(a,c){e=g();if(c&&!(a in e)){var f="uD"+j++;i(f,a);return f}else return e[a]}var b,d,e={},j=4;Aria.classDefinition({$classpath:"aria.storage.UserData",$dependencies:["aria.utils.Object","aria.utils.Dom","aria.utils.json.JsonSerializer","aria.core.Browser"],$implements:["aria.storage.IStorage"],
$extends:"aria.storage.AbstractStorage",$onload:function(){if(aria.core.Browser.isIE)try{var a=Aria.$frameworkWindow.document.createElement("form");a.innerHTML="<input type='hidden' id='__aria_storage_UserData__' style='behavior:url(#default#userData)'>";Aria.$frameworkWindow.document.body.appendChild(a);b=a.firstChild;b.load("JSONPersist");g()}catch(c){}},$onunload:function(){if(aria.core.Browser.isIE){b&&b.parentNode.removeChild(b);b=null}d&&d.$dispose();d=null},$prototype:{_get:function(a){return(a=
h(a))?b.getAttribute(a):null},_set:function(a,c){var f=h(a,true);b.setAttribute(f,c);b.save("JSONPersist")},_remove:function(a){b.removeAttribute(h(a));i(null,a);b.save("JSONPersist")},_clear:function(){var a=g();e={};b.removeAttribute("kMap");for(var c in a)a.hasOwnProperty(c)&&b.removeAttribute(a[c]);b.save("JSONPersist")}}})})();
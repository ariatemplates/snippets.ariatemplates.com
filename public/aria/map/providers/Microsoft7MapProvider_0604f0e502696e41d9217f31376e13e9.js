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
Aria.classDefinition({$classpath:"aria.map.providers.Microsoft7MapProvider",$singleton:true,$dependencies:["aria.utils.ScriptLoader"],$constructor:function(){this.credentials="";this._loadCallback=null},$destructor:function(){this._loadCallback=null},$prototype:{load:function(a){if(this.isLoaded())this.$callback(a);else{var b=this;this._loadCallback=a;Aria.$window.__bing7MapLoadCallback=function(){b._afterLoad.apply(b);b=null};aria.utils.ScriptLoader.load(["http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&mkt=en-US&onscriptload=__bing7MapLoadCallback"])}},
_afterLoad:function(){this.$assert(35,this.isLoaded());Aria.$window.__bing7MapLoadCallback=null;var a=this;Aria.$window.Microsoft.Maps.loadModule("Microsoft.Maps.Overlays.Style",{callback:function(){a.$callback.call(a,a._loadCallback);a=null}})},isLoaded:function(){return typeof Aria.$window.Microsoft!="undefined"&&typeof Aria.$window.Microsoft.Maps!="undefined"&&typeof Aria.$window.Microsoft.Maps.Map!="undefined"},getMap:function(a){var b={credentials:this.credentials};aria.utils.Json.inject(a.initArgs,
b);return this.isLoaded()?new Aria.$window.Microsoft.Maps.Map(a.domElement,b):null},disposeMap:function(a){a.dispose()}}});
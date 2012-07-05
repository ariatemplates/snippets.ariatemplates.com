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
(function(){Aria.classDefinition({$classpath:"aria.storage.LocalStorage",$extends:"aria.storage.HTML5Storage",$dependencies:["aria.core.Browser","aria.storage.UserData"],$constructor:function(a){var b=aria.core.Browser.isIE7;this.$HTML5Storage.constructor.call(this,a,"localStorage",!b);if(!this.storage&&b){a=new aria.storage.UserData(a);this._get=a._get;this._set=a._set;this._remove=a._remove;this._clear=a._clear;this.storage=aria.storage.UserData._STORAGE;this.__keys=aria.storage.UserData._ALL_KEYS;
this._fallback=a}},$destructor:function(){if(this._fallback){this._fallback.$dispose();this._fallback=null}this.$HTML5Storage.$destructor.call(this)}})})();
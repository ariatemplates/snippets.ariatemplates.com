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
Aria.classDefinition({$classpath:"aria.storage.HTML5Storage",$dependencies:["aria.utils.Event"],$extends:"aria.storage.AbstractStorage",$statics:{UNAVAILABLE:"%1 not supported by the browser."},$constructor:function(a,b,c){this.$AbstractStorage.constructor.call(this,a);this.type=b;this.storage=Aria.$window[b];this._browserEventCb={fn:this._browserEvent,scope:this};if(this.storage)aria.utils.Event.addListener(Aria.$window,"storage",this._browserEventCb);else if(c!==false){this._disposeSerializer&&
this.serializer&&this.serializer.$dispose();this.$logError(this.UNAVAILABLE,[this.type]);throw Error(this.type);}},$destructor:function(){aria.utils.Event.removeListener(Aria.$window,"storage",this._browserEventCb);this.__target=this._browserEventCb=null;this.$AbstractStorage.$destructor.call(this)},$prototype:{_get:function(a){return this.storage.getItem(a)},_set:function(a,b){this.storage.setItem(a,b)},_remove:function(a){this.storage.removeItem(a)},_clear:function(){this.storage.clear()},_browserEvent:function(a){if(this.namespace?
a.key.substring(0,this.namespace.length)===this.namespace:1){var b=a.oldValue,c=a.newValue;if(b)b=this.serializer.parse(b);if(c)c=this.serializer.parse(c);this._onStorageEvent({name:"change",key:a.key,oldValue:b,newValue:c,url:a.url,namespace:this.namespace})}},$on:function(a){aria.core.Browser.isIE8&&this.$logWarn(this.UNAVAILABLE,"change event");this.$AbstractStorage.$on.call(this,a)}}});
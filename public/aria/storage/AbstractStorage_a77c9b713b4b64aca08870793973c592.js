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
Aria.classDefinition({$classpath:"aria.storage.AbstractStorage",$dependencies:["aria.storage.EventBus","aria.utils.json.JsonSerializer","aria.utils.Type"],$implements:["aria.storage.IStorage"],$statics:{INVALID_SERIALIZER:"Invalid serializer configuration. Make sure it implements aria.utils.json.ISerializer",INVALID_NAMESPACE:"Inavlid namespace configuration. Must be a string.",EVENT_KEYS:["name","key","oldValue","newValue","url"]},$constructor:function(a){this._disposeSerializer=false;this._eventCallback=
{fn:this._onStorageEvent,scope:this};aria.storage.EventBus.$on({change:this._eventCallback});var b=a?a.serializer:null,c=true;if(b)if("serialize"in b&&"parse"in b)c=false;else this.$logError(this.INVALID_SERIALIZER);if(c){b=new aria.utils.json.JsonSerializer;this._disposeSerializer=true}this.serializer=b;b="";if(a&&a.namespace)if(aria.utils.Type.isString(a.namespace))b=a.namespace+"$";else this.$logError(this.INVALID_NAMESPACE);this.namespace=b},$destructor:function(){aria.storage.EventBus.$removeListeners({change:this._eventCallback});
this._disposeSerializer&&this.serializer&&this.serializer.$dispose();this._eventCallback=this.serializer=null},$prototype:{getItem:function(a){return this.serializer.parse(this._get(this.namespace+a))},setItem:function(a,b){var c=this.getItem(a),d=this.serializer.serialize(b,{reversible:true,keepMetadata:false});this._set(this.namespace+a,d);b=this.serializer.parse(d);aria.storage.EventBus.notifyChange(this.type,a,b,c,this.namespace)},removeItem:function(a){var b=this.getItem(a);if(b!==null){this._remove(this.namespace+
a);aria.storage.EventBus.notifyChange(this.type,a,null,b,this.namespace)}},clear:function(){this._clear();aria.storage.EventBus.notifyChange(this.type,null,null,null)},_onStorageEvent:function(a){if(a.key===null||a.namespace===this.namespace)this.$raiseEvent(aria.utils.Json.copy(a,false,this.EVENT_KEYS))}}});
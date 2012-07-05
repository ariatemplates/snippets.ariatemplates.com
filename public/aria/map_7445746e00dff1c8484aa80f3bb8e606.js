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
//LOGICAL-PATH:aria/map/CfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.map.CfgBeans",$description:"Definition of beans used for Maps",$namespaces:{json:"aria.core.JsonTypes",core:"aria.core.CfgBeans"},$beans:{MapCfg:{$type:"json:Object",$description:"Configuration object passed to a Map Provider to create a map",$properties:{id:{$type:"json:String",$description:"unique id of the map",$mandatory:true},domElement:{$type:"json:ObjectRef",$description:"HTML Element in which the map will be created",$mandatory:true},initArgs:{$type:"json:MultiTypes",
$description:"Arguments that will be used to create the actual map instance",$default:{}}}},CreateMapCfg:{$type:"MapCfg",$description:"Configuration object passed to the Map Manager to create a map",$properties:{provider:{$type:"json:String",$description:"Map provider",$mandatory:true},afterCreate:{$type:"core:Callback",$description:"Callback called after the map is created, It receives the map instance as first argument"}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/map/MapManager.js
//YpwKgK3gnz
(function(){var e={},j={},f={},g={microsoft7:"aria.map.providers.Microsoft7MapProvider"},i={};Aria.classDefinition({$classpath:"aria.map.MapManager",$singleton:true,$dependencies:["aria.map.CfgBeans","aria.templates.DomElementWrapper"],$constructor:function(){this._createdDomWrappers={}},$destructor:function(){this.destroyAllMaps();g=e=i=this._createdDomWrappers=f=j=null},$events:{mapReady:{description:"Notifies that a certain map has been loaded",properties:{mapId:"{String} id of the map"}},mapDestroy:{description:"Notifies that a certain map has been destroyed",
properties:{mapId:"{String} id of the map"}}},$statics:{INVALID_CONFIGURATION:"Invalid configuration for creating a map\n%1",INVALID_PROVIDER:"Provider %1 is not supported",DUPLICATED_PROVIDER:"Provider %1 exists already",DUPLICATED_MAP_ID:"A map with id %1 already exists.",LOADING:"loading",READY:"ready"},$prototype:{createMap:function(a){if(this._checkCfg(a))if(f[a.id])this.$logError(this.DUPLICATED_MAP_ID,a.id);else{f[a.id]=this.LOADING;var b=a.provider;if(b in g)this._getProviderInstance(b,{fn:this._loadProviderDependencies,
scope:this,args:a});else{this.$logError(this.INVALID_PROVIDER,b);delete f[a.id]}}},getMap:function(a){return e[a]?e[a].instance:null},getMapDom:function(a){var b=this._createdDomWrappers[a];if(b)return b;if(b=j[a]){b=new aria.templates.DomElementWrapper(b);return this._createdDomWrappers[a]=b}else return null},destroyMap:function(a){var b=e[a];if(b){i[b.provider].disposeMap(b.instance);delete e[a];j[a]&&delete j[a];if(b=this._createdDomWrappers[a]){b.$dispose();delete this._createdDomWrappers[a]}f[a]&&
delete f[a];this.$raiseEvent({name:"mapDestroy",mapId:a})}},destroyAllMaps:function(a){var b=a&&this.hasMapProvider(a),c,d;for(d in e)if(e.hasOwnProperty(d)){c=e[d];if(!b||c.provider==a)this.destroyMap(d)}},addMapProvider:function(a,b){if(g[a])this.$logError(this.DUPLICATED_PROVIDER,a);else g[a]=b},removeMapProvider:function(a){this.destroyAllMaps(a);delete g[a];delete i[a]},hasMapProvider:function(a){return a in g},_checkCfg:function(a){try{aria.core.JsonValidator.normalize({json:a,beanName:"aria.map.CfgBeans.CreateMapCfg"},
true)}catch(b){a=aria.core.Log;var c=[""];if(a)for(var d,h=0,k=b.errors.length;h<k;h+=1){d=b.errors[h];c.push(a.prepareLoggedMessage(d.msgId,d.msgArgs))}this.$logError(this.INVALID_CONFIGURATION,c.join("\n"));return false}return true},_getProviderInstance:function(a,b){i[a]?this.$callback(b):Aria.load({classes:[g[a]],oncomplete:{fn:this._setProviderInstance,scope:this,args:{provider:a,cb:b}}})},_setProviderInstance:function(a){var b=a.provider;i[b]=Aria.getClassRef(g[b]);this.$callback(a.cb)},_loadProviderDependencies:function(a,
b){i[b.provider].load({fn:this._retrieveMapInstance,scope:this,args:b})},_retrieveMapInstance:function(a,b){var c=a&&a.id&&a.provider?a:b,d=c.provider,h=c.id,k=c.afterCreate,l=i[d].getMap(c);e[h]={instance:l,provider:d};j[h]=c.domElement;f[h]=this.READY;k&&this.$callback(k,l);this.$raiseEvent({name:"mapReady",mapId:h})},getMapStatus:function(a){return f[a]||null}}})})();
//YpwKgK3gnz
//LOGICAL-PATH:aria/embed/Map.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.embed.Map",$extends:"aria.embed.Element",$dependencies:["aria.embed.controllers.MapController"],$constructor:function(a){this.$Element.constructor.apply(this,arguments);a.controller=aria.embed.controllers.MapController;this._cfg.args={id:a.id,provider:a.provider,initArgs:a.initArgs,loadingIndicator:a.loadingIndicator}},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.MapCfg"}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/embed/controllers/MapController.js
//YpwKgK3gnz
(function(){var e={},f={};Aria.classDefinition({$classpath:"aria.embed.controllers.MapController",$singleton:true,$dependencies:["aria.map.MapManager"],$constructor:function(){this.mapManager=aria.map.MapManager;this.mapManager.$addListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}});this._listeners=0},$destructor:function(){this.mapManager.$removeListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}});f=e=this.mapManager=null},$prototype:{onEmbededElementCreate:function(b,a){var c=this.mapManager.getMapStatus(a.id);
if(c==this.mapManager.READY)this._appendMap(null,{container:b,cfg:a});else{a.loadingIndicator&&this._triggerLoadingIndicator(b,true);if(c===null){c=aria.utils.Json.copy(a);var d=c.provider;this.mapManager.hasMapProvider(d)||this.mapManager.addMapProvider(d,d);delete c.loadingIndicator;d=Aria.$window.document.createElement("DIV");c.domElement=d;e[a.id]=d;c.afterCreate={fn:this._appendMap,scope:this,args:{container:b,cfg:a}};this.mapManager.createMap(c)}else{f[a.id]={container:b,cfg:a};this._listeners===
0&&this.mapManager.$addListeners({mapReady:{fn:this._waitAndAppendMap,scope:this}});this._listeners++}}},_waitAndAppendMap:function(b){var a=f[b.mapId];if(a){this._appendMap(null,a);delete f[b.mapId];this._listeners--;this._listeners===0&&this.mapManager.$removeListeners({mapReady:{fn:this._waitAndAppendMap,scope:this}})}},_appendMap:function(b,a){var c=a.container,d=a.cfg;c.appendChild(e[d.id]);d.loadingIndicator&&this._triggerLoadingIndicator(c,false)},onEmbededElementDispose:function(b,a){var c=
a.id;a.loadingIndicator&&this._triggerLoadingIndicator(b,false);if(c=e[c]){var d=c.parentNode;d&&d.removeChild(c)}},_nullifyMapDom:function(b){delete e[b.mapId]},_triggerLoadingIndicator:function(b,a){if(b)a?aria.utils.DomOverlay.create(b):aria.utils.DomOverlay.detachFrom(b)}}})})();
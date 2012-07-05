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
Aria.tplScriptDefinition({$classpath:"aria.tools.common.ObjectTreeDisplayScript",$prototype:{$dataReady:function(){this.data.showDepth&&this._showDepth(this.data.content,this.data.showDepth,0)},_showDepth:function(c,e,b){if(c&&b<e){c["view:ariaDebug:showOpen"+b]=true;for(var a in c)c.hasOwnProperty(a)&&this._showDepth(c[a],e,b+1)}},nodeClick:function(c,e){var b=e.element,a="view:ariaDebug:showOpen"+e.depth;b[a]=b[a]?false:true;this.$refresh()},filterTypes:function(c){var e={meta:{arrays:[],objects:[],
strings:[],numbers:[],instances:[],booleans:[],others:[]},data:{arrays:[],objects:[],strings:[],numbers:[],instances:[],booleans:[],others:[]}},b=aria.utils.Type,a;for(a in c)if(c.hasOwnProperty(a)&&!this.$json.isMetadata(a)&&a.indexOf("view:ariaDebug:showOpen")!=0){var f=c[a],d;d=a.indexOf(":")==-1?e.data:e.meta;d=b.isArray(f)?d.arrays:b.isObject(f)?d.objects:b.isString(f)?d.strings:b.isNumber(f)?d.numbers:b.isBoolean(f)?d.booleans:f&&f.$classpath?d.instances:d.others;d.push(a)}return e}}});
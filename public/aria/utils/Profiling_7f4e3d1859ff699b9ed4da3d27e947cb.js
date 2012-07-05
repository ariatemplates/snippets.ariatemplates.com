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
Aria.classDefinition({$classpath:"aria.utils.Profiling",$singleton:true,$constructor:function(){this._logsPerClasspath=this._logs=this._startTime=null;this._nbLogs=0;this._ids=1;this._displayDiv=null;this._counters={};this._counterSplits={};Aria.enableProfiling&&this.restartProfiling(true)},$destructor:function(){this._displayDiv=this._logsPerClasspath=this._logs=null},$prototype:{restartProfiling:function(b){this._startTime=b?Aria._start:new Date;if(b){this._logs=[{classpath:"Aria",msg:"Framework initialization",
start:Aria._start},{classpath:"Aria",stop:(new Date).getTime()}];this._nbLogs=2}else{this._logs=[];this._nbLogs=0}aria.core.JsObject.prototype.$logTimestamp=function(c,a){a=a?a:this.$classpath;aria.utils.Profiling.logTimestamp(a,c)};aria.core.JsObject.prototype.$startMeasure=function(c,a){a=a?a:this.$classpath;return aria.utils.Profiling.startMeasure(a,c)};aria.core.JsObject.prototype.$stopMeasure=function(c,a){a=a?a:this.$classpath;aria.utils.Profiling.stopMeasure(a,c)}},process:function(){this._logsPerClasspath=
{};var b,c,a,d,e;for(b=e=0;b<this._nbLogs;b++){a=this._logs[b];if(a.start&&!("length"in a)){for(c=b+1;c<this._nbLogs;c++){d=this._logs[c];if(d.stop&&d.classpath==a.classpath)if(!d.id||a.id===d.id){this._logs.splice(c,1);this._nbLogs--;a.length=d.stop-a.start;a.start-=this._startTime;break}}if(!("length"in a)){a.length=0;a.start-=this._startTime}}else if(a.timestamp){a.start=a.timestamp-this._startTime;a.length=0;delete a.timestamp}if(false in a)a.msg="NO MESSAGE";c=a.start+a.length;if(c>e)e=c;this._logsPerClasspath[a.classpath]||
(this._logsPerClasspath[a.classpath]={});c=this._logsPerClasspath[a.classpath];c[a.msg]||(c[a.msg]=[0]);c[a.msg].push(a);c[a.msg][0]+=a.length}this._logsPerClasspath._max=e},showProfilingData:function(){if(this._displayDiv==null){this.process();var b=Aria.$window.document;this._displayDiv=b.createElement("div");this._displayDiv.style.cssText="position:absolute;top:0px;left:0px;width:100%;height:100%; z-index:99999999;overflow:auto;background:white";b.body.appendChild(this._displayDiv);Aria.loadTemplate({classpath:"aria.utils.ProfilingDisplay",
div:this._displayDiv,data:aria.utils.Json.copy(this._logsPerClasspath,true)})}},hideProfilingData:function(){this._displayDiv.innerHTML="";this._displayDiv!=null&&aria.utils.Dom.removeElement(this._displayDiv);this._displayDiv=null},logTimestamp:function(b,c){this._logs[this._nbLogs++]={classpath:b,msg:c,timestamp:(new Date).getTime()}},startMeasure:function(b,c){this._logs[this._nbLogs++]={classpath:b,msg:c,id:this._ids,start:(new Date).getTime()};return this._ids++},stopMeasure:function(b,c){this._logs[this._nbLogs++]=
{classpath:b,id:c,stop:(new Date).getTime()}},incrementCounter:function(b,c){if(this._counters.hasOwnProperty(b))this._counters[b]+=c||1;else this._counters[b]=c||1},resetCounter:function(b,c){if(this._counters[b]){this._counterSplits[b]||(this._counterSplits[b]=[]);this._counterSplits[b].push({value:this._counters[b],reason:c});this._counters[b]=0}},getCounterValue:function(b){return this._counters[b]||0},getAvgSplitCounterValue:function(b){if(!this._counterSplits[b])return 0;for(var c=0,a=0,d=this._counterSplits[b].length;a<
d;a+=1)c+=this._counterSplits[b][a].value;return c/d}}});
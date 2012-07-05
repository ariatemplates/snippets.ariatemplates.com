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
Aria.classDefinition({$classpath:"aria.utils.environment.Date",$dependencies:["aria.utils.environment.DateCfgBeans"],$extends:"aria.core.environment.EnvironmentBase",$singleton:true,$prototype:{_cfgPackage:"aria.utils.environment.DateCfgBeans.AppCfg",getDateFormats:function(){return this.checkApplicationSettings("dateFormats")},getTimeFormats:function(){return this.checkApplicationSettings("timeFormats")},getFirstDayOfWeek:function(){var a=this.checkApplicationSettings("firstDayOfWeek");if(aria.utils.Date)a=
aria.utils.Date.firstDayOfWeek;return a},_applyEnvironment:function(a){if(aria.utils.Date)aria.utils.Date.firstDayOfWeek=this.checkApplicationSettings("firstDayOfWeek");this.$callback(a)}}});
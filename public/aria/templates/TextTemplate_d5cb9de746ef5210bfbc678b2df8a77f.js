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
Aria.classDefinition({$classpath:"aria.templates.TextTemplate",$extends:"aria.templates.BaseTemplate",$dependencies:["aria.templates.TxtCtxt"],$constructor:function(){this.$BaseTemplate.constructor.call(this)},$destructor:function(){this.$BaseTemplate.$destructor.call(this)},$prototype:{data:{},$init:function(c,d){c.$BaseTemplate.constructor.classDefinition.$prototype.$init(c,d);aria.templates.TextTemplate.processTextTemplate=function(a){var b=new aria.templates.TxtCtxt;b.initTemplate({classpath:this.prototype.$classpath,
data:a});a=b.getTextTemplateContent();b.$dispose();return a}}}});
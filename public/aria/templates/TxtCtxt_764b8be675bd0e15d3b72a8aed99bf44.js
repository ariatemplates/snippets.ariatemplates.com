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
Aria.classDefinition({$classpath:"aria.templates.TxtCtxt",$extends:"aria.templates.BaseCtxt",$implements:["aria.templates.IBaseTemplate"],$constructor:function(){this.$BaseCtxt.constructor.apply(this,arguments);this.tplClasspath=null},$destructor:function(){if(this._tpl){try{this._tpl.$dispose()}catch(a){this.$logError(this.TEMPLATE_DESTR_ERROR,[this.tplClasspath],a)}aria.templates.IBaseTemplate.prototype.$destructor.call(this._tpl);this._tpl=null}this.$BaseCtxt.$destructor.call(this)},$prototype:{initTemplate:function(a){if(!aria.core.JsonValidator.normalize({json:a,
beanName:"aria.templates.CfgBeans.InitTxtTemplateCfg"}))return false;this._cfg=a;var b;try{b=Aria.getClassInstance(a.classpath)}catch(d){this.$logError(this.TEMPLATE_CONSTR_ERROR,[a.classpath],d);return false}this._tpl=b;this.tplClasspath=a.classpath;aria.templates.IBaseTemplate.call(b,this);var c=this;b.__$write=function(e){return c.__$write.call(c,e)};if(!b.__$initTemplate())return false;b.data=a.data;return true},getTextTemplateContent:function(){this.$assert(19,this._out==null);this._out=[];this._callMacro(this._out,
"main");var a=this._out.join("");this._out=null;return a},__$write:function(a){this._out.push(a)}}});
/*
 * Aria Templates 1.3.4 - 21 Jan 2013
 *
 * Copyright 2009-2013 Amadeus s.a.s.
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
//*******************
//LOGICAL-PATH:aria/templates/TextTemplate.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TextTemplate",$extends:"aria.templates.BaseTemplate",$dependencies:["aria.templates.TxtCtxt"],$constructor:function(){this.$BaseTemplate.constructor.call(this)},$destructor:function(){this.$BaseTemplate.$destructor.call(this)},$prototype:{data:{},$init:function(e,t){e.$BaseTemplate.constructor.classDefinition.$prototype.$init(e,t),aria.templates.TextTemplate.processTextTemplate=function(e){var t=new aria.templates.TxtCtxt;t.initTemplate({classpath:this.prototype
.$classpath,data:e});var n=t.getTextTemplateContent();return t.$dispose(),n}}}});
//*******************
//LOGICAL-PATH:aria/templates/TxtClassGenerator.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TxtClassGenerator",$extends:"aria.templates.ClassGenerator",$singleton:!0,$dependencies:["aria.templates.TxtParser"],$constructor:function(){this.$ClassGenerator.constructor.call(this),this._loadStatements(["TextTemplate"]),this._parser=aria.templates.TxtParser,this._superClass="aria.templates.TextTemplate",this._classType="TXT",this._rootStatement="TextTemplate",this._templateParamBean="aria.templates.CfgBeans.TextTemplateCfg"},$prototype:{_writeClassInit:function(
e){var t=e.templateParam;e.enterBlock("classInit"),e.writeln(e.templateParam.$classpath,".processTextTemplate = aria.templates.TextTemplate.processTextTemplate;"),e.leaveBlock(),this.$ClassGenerator._writeClassInit.call(this,e)}}});
//*******************
//LOGICAL-PATH:aria/templates/TxtCtxt.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TxtCtxt",$extends:"aria.templates.BaseCtxt",$implements:["aria.templates.IBaseTemplate"],$constructor:function(e){this.$BaseCtxt.constructor.apply(this,arguments),this.tplClasspath=null},$destructor:function(){if(this._tpl){try{this._tpl.$dispose()}catch(e){this.$logError(this.TEMPLATE_DESTR_ERROR,[this.tplClasspath],e)}aria.templates.IBaseTemplate.prototype.$destructor.call(this._tpl),this._tpl=null}this.$BaseCtxt.$destructor.call(this)},$prototype:{initTemplate
:function(e){if(!aria.core.JsonValidator.normalize({json:e,beanName:"aria.templates.CfgBeans.InitTxtTemplateCfg"}))return!1;this._cfg=e;var t;try{t=Aria.getClassInstance(e.classpath)}catch(n){return this.$logError(this.TEMPLATE_CONSTR_ERROR,[e.classpath],n),!1}this._tpl=t,this.tplClasspath=e.classpath,aria.templates.IBaseTemplate.call(t,this);var r=this;return t.__$write=function(e){return r.__$write.call(r,e)},t.__$initTemplate()?(t.data=e.data,!0):!1},getTextTemplateContent:function(){this.$assert(19,this.
_out==null),this._out=[],this._callMacro(this._out,"main");var e=this._out.join("");return this._out=null,e},__$write:function(e){this._out.push(e)}}});
//*******************
//LOGICAL-PATH:aria/templates/ViewCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.templates.ViewCfgBeans",$description:"Definition of beans used in aria.templates.View",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Item:{$type:"json:Object",$description:"Structure used in the items property of the view. Each item corresponds to an element of the initial array.",$properties:{value:{$type:"json:MultiTypes",$description:"Link to the value in the initial array."},initIndex:{$type:"json:MultiTypes",$description:"Index of the element inside the initial array or map."
,$mandatory:!0,$contentTypes:[{$type:"json:Integer",$description:"Position of the item value inside the initial array."},{$type:"json:String",$description:"Key of the item value inside the initial map."}]},filteredIn:{$type:"json:Boolean",$description:"Indicates whether the element is filtered in or not. Can be changed outside the View class, but only through the aria.utils.Json.setValue function, so that the view is notified of any change. This way, this property can also be binded to a widget.",$mandatory:!0
},sortKey:{$type:"json:String",$description:"Last sort key used for this element."},pageIndex:{$type:"json:Integer",$description:"Index of the page to which the element belongs. If not in page mode, is 0 for all filtered in elements. If filteredIn is false, pageIndex = -1.",$mandatory:!0}}},Pages:{$type:"json:Object",$description:"Description of a page.",$properties:{pageIndex:{$type:"json:Integer",$description:"Index of the page in the pages property of the view. 0 for the first page."},pageNumber:{$type:"json:Integer"
,$description:"Number of the page (= pageIndex + 1)"},firstItemIndex:{$type:"json:Integer",$description:"Index of an element in the items property of the view, such that no element before that one belongs to this page."},lastItemIndex:{$type:"json:Integer",$description:"Index of an element in the items property of the view, such that no element after that one belongs to this page."},firstItemNumber:{$type:"json:Integer",$description:"Number of the first element in the page, counting only the filtered in elements, and starting at 1 for the first element in the first page."
},lastItemNumber:{$type:"json:Integer",$description:"Number of the last element in the page, counting only the filtered in elements, and starting at 1 for the first element in the first page. When in page mode, for all pages except the last one: lastItemNumber - firstItemNumber + 1 = pageSize"}}}}});
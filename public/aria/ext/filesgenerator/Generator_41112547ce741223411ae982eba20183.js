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
Aria.classDefinition({$classpath:"aria.ext.filesgenerator.Generator",$extends:"aria.core.JsObject",$singleton:true,$dependencies:["aria.core.JsonValidator","aria.ext.filesgenerator.GeneratorBeans"],$texts:{classTxtTplHandle:"aria.ext.filesgenerator.tpl.Class",interfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.Interface",htmlTemplateTxtTplHandle:"aria.ext.filesgenerator.tpl.HtmlTemplate",cssTemplateTxtTplHandle:"aria.ext.filesgenerator.tpl.CssTemplate",templateScriptTxtTplHandle:"aria.ext.filesgenerator.tpl.TemplateScript",
macroLibraryTxtTplHandle:"aria.ext.filesgenerator.tpl.MacroLibrary",flowControllerTxtTplHandle:"aria.ext.filesgenerator.tpl.FlowController",moduleControllerTxtTplHandle:"aria.ext.filesgenerator.tpl.ModuleController",moduleControllerInterfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.ModuleControllerInterface",flowControllerInterfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.FlowControllerInterface",bootstrapTxtTplHandle:"aria.ext.filesgenerator.tpl.Bootstrap"},$statics:{TYPE_CLASS:"class",TYPE_INTERFACE:"interface",
TYPE_HTMLTEMPLATE:"htmlTemplate",TYPE_CSSTEMPLATE:"cssTemplate",TYPE_TEMPLATESCRIPT:"templateScript",TYPE_MACROLIBRARY:"macroLibrary",TYPE_FLOWCONTROLLER:"flowController",TYPE_MODULECONTROLLER:"moduleController",TYPE_MODULECONTROLLERINTERFACE:"moduleControllerInterface",TYPE_FLOWCONTROLLERINTERFACE:"flowControllerInterface",TYPE_BOOTSTRAP:"bootstrap"},$constructor:function(){this.__classNameCounter=0},$destructor:function(){},$prototype:{generateFile:function(a,e){if(a)if(a=this.__isAllowedType("TYPE_"+
a.toUpperCase())){var b=this.__getSkeleton(this[a+"TxtTplHandle"],"aria.ext.filesgenerator.GeneratorBeans."+a+"SkeletonTemplate",e);return{type:a,classpath:b.cfg.$classpath,content:b.content}}return null},generateHtmlTemplate:function(a,e,b){var c=[],d={$classpath:a};if(e){d.$hasScript=true;c.push(this.generateFile(this.TYPE_TEMPLATESCRIPT,{$classpath:a+"Script"}))}if(b){a+="Style";d.$css=[a];c.push(this.generateFile(this.TYPE_CSSTEMPLATE,{$classpath:a}))}c.push(this.generateFile(this.TYPE_HTMLTEMPLATE,
d));return c},generateModuleCtrl:function(a,e){var b=[],c=a.lastIndexOf("."),d=a.substring(0,c);c=a.substring(c+1);var f=d+".I"+c;b.push(this.generateFile(this.TYPE_MODULECONTROLLERINTERFACE,{$classpath:f,$description:a+" public interface definition"}));b.push(this.generateFile(this.TYPE_MODULECONTROLLER,{$classpath:a,$description:"My module controller",$publicInterface:f,$hasFlowCtrl:e}));if(e){d=d+".I"+c+"Flow";c=a+"Flow";b.push(this.generateFile(this.TYPE_FLOWCONTROLLERINTERFACE,{$classpath:d,
$description:c+" public interface definition"}));b.push(this.generateFile(this.TYPE_FLOWCONTROLLER,{$classpath:c,$publicInterface:d,$description:"My flow controller"}))}return b},getUniqueClasspathIn:function(a){return a+".Class"+this.__classNameCounter++},__isAllowedType:function(a){return aria.utils.Json.getValue(this,a)},__getSkeleton:function(a,e,b){b||(b={});aria.core.JsonValidator.normalize({json:b,beanName:e});return{cfg:b,content:a.processTextTemplate(b)}}}});
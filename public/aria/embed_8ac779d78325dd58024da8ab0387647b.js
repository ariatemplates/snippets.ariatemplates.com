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
//LOGICAL-PATH:aria/embed/CfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.embed.CfgBeans",$description:"Definition of the JSON beans used by the aria embed lib",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{ElementCfg:{$type:"json:Object",$description:"Embed element widget",$properties:{controller:{$type:"json:ObjectRef",$description:"Controller used to manage the embedded dom"},type:{$type:"json:String",$description:"DOM type for this section.",$default:"div"},attributes:{$type:"html:HtmlAttribute",
$description:"Parameters to apply to the DOM element of the section."},args:{$type:"json:MultiTypes",$description:"Argument given to the onEmbededElementCreate and onEmbededElementDispose functions of the provided embed controller"}}},MapCfg:{$type:"json:Object",$description:"Map widget configuration",$properties:{id:{$type:"json:String",$description:"Id of the map",$mandatory:true},provider:{$type:"json:String",$description:"Map provider",$mandatory:true},initArgs:{$type:"json:MultiTypes",$description:"Map initialization arguments"},
loadingIndicator:{$type:"json:Boolean",$description:"Add a loading overlay over the map while loading",$default:false},type:{$type:"json:String",$description:"DOM type for this section.",$default:"div"},attributes:{$type:"html:HtmlAttribute",$description:"Parameters to apply to the DOM element of the section."}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/embed/Element.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.embed.Element",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.embed.CfgBeans","aria.utils.Html","aria.core.JsonValidator","aria.core.Log","aria.utils.Dom"],$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid."},$constructor:function(d){this.$BaseWidget.constructor.apply(this,arguments);try{this._cfgOk=aria.core.JsonValidator.normalize({json:d,beanName:this._cfgBeanName},true)}catch(a){var b=aria.core.Log;if(b){for(var c,e=0,f=
a.errors.length;e<f;e++){c=a.errors[e];c.message=b.prepareLoggedMessage(c.msgId,c.msgArgs)}this.$logError(this.INVALID_CONFIGURATION,null,a)}}},$destructor:function(){if(this._domId)this._cfg.controller.onEmbededElementDispose(aria.utils.Dom.getElementById(this._domId),this._cfg.args);this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.ElementCfg",writeMarkup:function(d){if(this._cfgOk){this._domId=this._createDynamicId();var a=this._cfg.type,b=["<",a,
' id="',this._domId,'"'];this._cfg.attributes&&b.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes));b.push("></"+a+">");d.write(b.join(""))}},initWidget:function(){if(this._cfgOk)this._cfg.controller.onEmbededElementCreate(aria.utils.Dom.getElementById(this._domId),this._cfg.args)}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/embed/EmbedLib.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.embed.EmbedLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:true,$prototype:{widgets:{Element:"aria.embed.Element",Map:"aria.embed.Map"}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/embed/IEmbedController.js
//YpwKgK3gnz
Aria.interfaceDefinition({$classpath:"aria.embed.IEmbedController",$extends:"aria.templates.IModuleCtrl",$interface:{onEmbededElementCreate:function(){},onEmbededElementDispose:function(){}}});
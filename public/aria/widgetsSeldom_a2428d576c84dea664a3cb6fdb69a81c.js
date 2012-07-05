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
//LOGICAL-PATH:aria/widgets/AriaSkinBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.widgets.AriaSkinBeans",$description:"Structure of a skin.",$namespaces:{json:"aria.core.JsonTypes"},$beans:{SkinCfg:{$type:"json:Object",$description:"Whole configuration of a skin (both CSS and JS part), as an application developper can describe it.",$properties:{name:{$type:"json:String",$description:""},palette:{$type:"json:Object",$description:"",$properties:{background:{$type:"json:Object",$description:""},border:{$type:"json:Object",$description:""},text:{$type:"json:Object",
$description:""}}},parent:{$type:"json:Object",$description:"",$properties:{name:{$type:"json:String",$description:""},version:{$type:"json:String",$description:""}}},general:{$type:"json:ObjectRef",$description:""},widgets:{$type:"json:Object",$description:"",$properties:{TextInput:{$type:"json:ObjectRef",$description:""},Dialog:{$type:"json:ObjectRef",$description:""},SelectBox:{$type:"json:ObjectRef",$description:""},Select:{$type:"json:ObjectRef",$description:""},DatePicker:{$type:"json:ObjectRef",
$description:""},MultiSelect:{$type:"json:ObjectRef",$description:""},Div:{$type:"json:ObjectRef",$description:""},Button:{$type:"json:ObjectRef",$description:""},CheckBox:{$type:"json:ObjectRef",$description:""},RadioButton:{$type:"json:ObjectRef",$description:""},Icon:{$type:"json:ObjectRef",$description:""},List:{$type:"json:ObjectRef",$description:""},Calendar:{$type:"json:ObjectRef",$description:""},Gauge:{$type:"json:ObjectRef",$description:""},SortIndicator:{$type:"json:ObjectRef",$description:""},
Tab:{$type:"json:ObjectRef",$description:""},TabPanel:{$type:"json:ObjectRef",$description:""},Text:{$type:"json:ObjectRef",$description:""},Link:{$type:"json:ObjectRef",$description:""},scFieldSet:{$type:"BaseWidgetJsSkinCfg",$description:"",$mandatory:false}}}}},DivSkinCfg:{$type:"json:Object",$description:"",$properties:{sprType:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:3},states:{$type:"json:Map",$description:"",$contentType:{$type:"json:ObjectRef",$description:""}}}},Color:{$type:"json:String",
$description:""},JsSkinCfg:{$type:"json:Object",$description:"Part of the skin configuration which is stored as a JS file (as opposed to the part of the skin which is stored as a CSS file).",$properties:{scDiv:{$type:"DivJsSkinCfg",$description:"",$mandatory:true},scTextInput:{$type:"TextInputJsSkinCfg",$description:"",$mandatory:true},scButton:{$type:"ButtonJsSkinCfg",$description:"",$mandatory:true},scCheckBox:{$type:"CheckBoxJsSkinCfg",$description:"",$mandatory:true},scSortIndicator:{$type:"SortIndicatorJsSkinCfg",
$description:"",$mandatory:true},scTab:{$type:"TabJsSkinCfg",$description:"",$mandatory:true},scTabPanel:{$type:"TabPanelJsSkinCfg",$description:"",$mandatory:true},scText:{$type:"TextJsSkinCfg",$description:"",$mandatory:true},scRadioButton:{$type:"RadioButtonJsSkinCfg",$description:"",$mandatory:true},scIcon:{$type:"IconJsSkinCfg",$description:"",$mandatory:true},scList:{$type:"ListJsSkinCfg",$description:"",$mandatory:true},scCalendar:{$type:"CalendarJsSkinCfg",$description:"",$mandatory:true},
scGauge:{$type:"GaugeJsSkinCfg",$description:"",$mandatory:true},scDialog:{$type:"DialogJsSkinCfg",$description:"",$mandatory:true}}},BaseWidgetJsSkinCfg:{$type:"json:Map",$description:"",$contentType:{$type:"json:Object",$description:""}},CheckBoxJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$properties:{iconset:{$type:"json:String",$description:""},iconprefix:{$type:"json:String",$description:""},states:{$type:"json:Map",$description:"",
$contentType:{$type:"json:Object",$description:"",$properties:{color:{$type:"Color",$description:""}}}}}}},SortIndicatorJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$properties:{iconset:{$type:"json:String",$description:""},iconprefix:{$type:"json:String",$description:""},states:{$type:"json:Map",$description:"",$contentType:{$type:"json:Object",$description:"",$properties:{color:{$type:"Color",$description:""}}}}}}},TabJsSkinCfg:{$type:"DivJsSkinCfg",
$description:"",$contentType:{$type:"DivJsSkinCfg.$contentType",$description:""}},TabPanelJsSkinCfg:{$type:"DivJsSkinCfg",$description:"",$contentType:{$type:"DivJsSkinCfg.$contentType",$description:""}},TextJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:""}},RadioButtonJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$properties:{iconset:{$type:"json:String",$description:""},
iconprefix:{$type:"json:String",$description:""}}}},IconJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:"",$properties:{cssClass:{$type:"json:String",$description:""},spriteURL:{$type:"json:String",$description:""},spriteSpacing:{$type:"json:Integer",$description:""},iconWidth:{$type:"json:Integer",$description:""},iconHeight:{$type:"json:Integer",$description:""},verticalAlign:{$type:"json:String",$description:""},margins:{$type:"json:String",
$description:""},biDimensional:{$type:"json:Boolean",$description:""},direction:{$type:"json:Enum",$description:"",$enumValues:["x","y"]},content:{$type:"json:Map",$description:"",$contentType:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"json:String",$description:""},{$type:"json:Integer",$description:""}]}}}}},DivJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:"",$properties:{spcLeft:{$type:"json:Integer",
$description:""},spcRight:{$type:"json:Integer",$description:""},spcTop:{$type:"json:Integer",$description:""},spcBottom:{$type:"json:Integer",$description:""},offsetLeft:{$type:"json:Integer",$description:""},sprType:{$type:"json:Integer",$description:""},sprHeight:{$type:"json:Integer",$description:""},sprWidth:{$type:"json:Integer",$description:""},bgRepeat:{$type:"json:Boolean",$description:""},fixedHeight:{$type:"json:Boolean",$description:""},states:{$type:"json:Map",$description:"",$contentType:{$type:"json:Object",
$description:"",$properties:{topPos:{$type:"json:Integer",$description:""},sprIdx:{$type:"json:Integer",$description:""},color:{$type:"Color",$description:""},textAlign:{$type:"json:String",$description:""}}}}}}},TextInputJsSkinCfg:{$type:"DivJsSkinCfg",$description:"",$contentType:{$type:"DivJsSkinCfg.$contentType",$description:"",$properties:{helpText:{$type:"json:Object",$description:"",$properties:{color:{$type:"Color",$description:""},italics:{$type:"json:Boolean",$description:""}}}}}},ButtonJsSkinCfg:{$type:"DivJsSkinCfg",
$description:"",$contentType:{$type:"DivJsSkinCfg.$contentType",$description:""}},ListJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:"",$properties:{divsclass:{$type:"json:String",$description:""},cssClassItem:{$type:"json:String",$description:""},cssClassEnabled:{$type:"json:String",$description:""},cssClassSelected:{$type:"json:String",$description:""},cssClassDisabled:{$type:"json:String",$description:""},cssClassFooter:{$type:"json:String",
$description:"Class for the footer of the list"}}}},CalendarJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:"",$properties:{defaultTemplate:{$type:"json:String",$description:""},cssClass:{$type:"json:String",$description:""},cssClassMonthTitle:{$type:"json:String",$description:""},cssClassSelected:{$type:"json:String",$description:""},cssClassUnselectable:{$type:"json:String",$description:""},cssClassSelectable:{$type:"json:String",
$description:""},cssClassDay:{$type:"json:String",$description:""},cssClassWeekend:{$type:"json:String",$description:""},cssClassToday:{$type:"json:String",$description:""},cssClassMouseover:{$type:"json:String",$description:""},cssClassMouseout:{$type:"json:String",$description:""},previousPageIcon:{$type:"json:String",$description:""},nextPageIcon:{$type:"json:String",$description:""}}}},DialogJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",
$description:""}},GaugeJsSkinCfg:{$type:"BaseWidgetJsSkinCfg",$description:"",$contentType:{$type:"BaseWidgetJsSkinCfg.$contentType",$description:"",$properties:{sprHeight:{$type:"json:Integer",$description:"Specifies the sprite height used for the background of the whole gauge and the progress bar"},border:{$type:"json:String",$description:"Specifies the gauge border style, width and color"},borderPadding:{$type:"json:Integer",$description:"Specifies the border padding"},labelMargins:{$type:"json:String",
$description:""},labelFontSize:{$type:"json:Integer",$description:"Font size in pixels"}}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/action/IconButton.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.action.IconButton",$extends:"aria.widgets.action.Button",$dependencies:["aria.widgets.Icon"],$constructor:function(a,b,c){this.$Button.constructor.apply(this,arguments);this._icon=new aria.widgets.Icon({icon:a.icon},b,c)},$destructor:function(){this._icon.$dispose();this.$Button.$destructor.call(this)},$prototype:{_widgetMarkupContent:function(a){this._icon.writeMarkup(a)}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/container/Fieldset.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.container.Fieldset",$extends:"aria.widgets.container.Container",$dependencies:["aria.utils.Function","aria.DomEvent","aria.widgets.frames.FrameFactory","aria.utils.String"],$css:["aria.widgets.css."+aria.widgets.AriaSkinInterface.getSkinName()+".Fieldset"],$constructor:function(a){this.$Container.constructor.apply(this,arguments);if(!this._frame)this._frame=aria.widgets.frames.FrameFactory.createFrame({skinnableClass:"Fieldset",sclass:a.sclass,state:"normal",
width:a.width,height:a.height,printOptions:a.printOptions})},$destructor:function(){if(this._frame){this._frame.$dispose();this._frame=null}this.$Container.$destructor.call(this)},$statics:{INPUT_ATTRIBUTE:"_ariaInput"},$prototype:{_init:function(){var a=this.getDom();this._frame.linkToDom(aria.utils.Dom.getDomElementChild(a,0));this.$Container._init.call(this)},_checkTargetBeforeSubmit:function(a){return a.getAttribute(this.INPUT_ATTRIBUTE)=="1"},_dom_onkeydown:function(a){if(a.keyCode==a.KC_ENTER)if(this._checkTargetBeforeSubmit(a.target))if(this._cfg.onSubmit)return this.evalCallback(this._cfg.onSubmit)===
true},_widgetMarkupBegin:function(a){this._frame.writeMarkupBegin(a)},_widgetMarkupEnd:function(a){this._frame.writeMarkupEnd(a);var b=this._cfg.label;b&&a.write('<span class="xFieldset_'+this._cfg.sclass+'_normal_label">'+aria.utils.String.escapeHTML(b)+"</span>")}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/controllers/MultiSelectController.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.controllers.MultiSelectController",$dependencies:["aria.utils.Json","aria.DomEvent","aria.widgets.controllers.reports.DropDownControllerReport"],$extends:"aria.widgets.controllers.DropDownListController",$constructor:function(){this.$DropDownListController.constructor.call(this);this._separator=null;this._fieldDisplay="value";this._dataModel.selectedValues=[];this._cacheValues={}},$destructor:function(){this._cacheValues=null;this.$DropDownListController.$destructor.call(this)},
$statics:{INVALID_MULTISELECT_CONTENT:"Multiselect items should not contain field separator as a value."},$prototype:{setSeparator:function(a){this._separator=a},setFieldDisplay:function(a){this._fieldDisplay=a},setValueDisplay:function(a){this._valueDisplay=a},getSeparator:function(){return this._separator},setListOptions:function(a){this._cacheValues={};this._dataModel.listContent=a},toggleDropdown:function(a,c){var b=this._dataModel,g=b.listContent,e=b.selectedValues;b.selectedIdx=-1;e=this._parseInputString(g,
a);if(!c)if(!aria.utils.Json.equals(e,b.value)){aria.utils.Json.setValue(b,"selectedValues",e);b.value=e;b.text=this._getDisplayValue(e)}var h=new aria.widgets.controllers.reports.DropDownControllerReport;h.displayDropDown=g.length>0&&!c;if(h.displayDropDown){b.initialInput=a;aria.utils.Json.setValue(b,"listContent",g)}h.text=b.text;h.value=this._getValue(b.text,b.value);if(!e.length)b.selectedIdx=null;return h},_parseInputString:function(a,c){var b=[],g=c.split(this._separator);if(g)for(var e=0,
h=g.length;e<h;e++)for(var d=0,i=a.length;d<i;d++){var f=aria.utils.String.trim(g[e]);a[d].label+="";a[d].value+="";f+="";if(a[d].label.toLowerCase()==f.toLowerCase()||a[d].value.toLowerCase()==f.toLowerCase())if((a[d].label.toLowerCase()==f.toLowerCase()||a[d].value.toLowerCase()==f.toLowerCase())&&!aria.utils.Array.contains(b,a[d].value))b.push(a[d].value)}return b},_getDisplayValue:function(a){for(var c=this._fieldDisplay,b=this._dataModel.listContent,g=this._fieldDisplay=="value"?"label":"value",
e=[],h,d=0,i=a.length;d<i;d++){h=a[d];for(var f=0,j=b.length;f<j;f++)if(b[f].value==h)e.push(b[f][c]?b[f][c]:b[f][g])}return e.join(this._separator)},checkValue:function(a){var c=new aria.widgets.controllers.reports.DropDownControllerReport,b=this._dataModel;if(a===null){c.ok=true;b.value=null;b.text=""}else{if(aria.utils.Json.equals(a,b.value)){if(!aria.utils.Json.equals(b.selectedValues,b.value)){a=b.selectedValues;b.value=a}}else{aria.utils.Json.setValue(b,"selectedValues",a);b.value=a}c.ok=true;
a=this._getDisplayValue(a);b.text=a}if(c.ok){c.text=b.text;c.value=this._getValue(b.text,b.value)}return c},checkText:function(a){var c=this._dataModel;a=this._parseInputString(c.listContent,a);if(!aria.utils.Json.equals(a,c.value)){aria.utils.Json.setValue(c,"value",a);aria.utils.Json.setValue(c,"text",this._getDisplayValue(a));aria.utils.Json.setValue(c,"selectedValues",a)}a=new aria.widgets.controllers.reports.DropDownControllerReport;a.text=c.text;a.value=this._getValue(c.text,c.value);return a},
checkError:function(){for(var a=this._dataModel.listContent,c,b=0,g=a.length;b<g;b++){c=a[b].value+"";if(c.indexOf(this._separator)!=-1){this.$logError(this.INVALID_MULTISELECT_CONTENT);break}}},_checkInputKey:function(a,c,b){if(aria.DomEvent.KC_ARROW_DOWN===c){a=this.checkValue(b.split(this._separator));a!=null&&a.$dispose()}a=new aria.widgets.controllers.reports.DropDownControllerReport;a.ok=true;a.cancelKeyStroke=false;a.displayDropDown=c===aria.DomEvent.KC_ARROW_DOWN;return a},_getValue:function(a,
c){var b=this._cacheValues[a];if(b)return b;return this._cacheValues[a]=c},getDisplayTextFromValue:function(a){return this._getDisplayValue(a)}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/form/DateField.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.form.DateField",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.DateController"],$constructor:function(a,c,d){var b=new aria.widgets.controllers.DateController;this.$TextInput.constructor.call(this,a,c,d,b);b.setPattern(a.pattern);a.minValue&&b.setMinValue(new Date(a.minValue));a.maxValue&&b.setMaxValue(new Date(a.maxValue));a.referenceDate&&b.setReferenceDate(new Date(a.referenceDate))},$prototype:{_onBoundPropertyChange:function(a,
c,d){a==="referenceDate"?this.controller.setReferenceDate(c):this.$TextInput._onBoundPropertyChange.call(this,a,c,d)}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/controllers/DateController.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.controllers.DateController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.DomEvent","aria.widgets.controllers.reports.ControllerReport","aria.utils.Date","aria.utils.Type","aria.utils.environment.Date"],$resources:{res:"aria.widgets.WidgetsRes"},$constructor:function(){this.$TextDataController.constructor.call(this);this._dataModel={jsDate:null,displayText:""};this._pattern="";this._referenceDate=this._maxValue=this._minValue=
null},$destructor:function(){this._dataModel=null;this.$TextDataController.$destructor.call(this)},$prototype:{setPattern:function(a){if(!a)a=aria.utils.environment.Date.getDateFormats().shortFormat;this._pattern=a},setMinValue:function(a){this._minValue=aria.utils.Date.removeTime(a)},setMaxValue:function(a){this._maxValue=aria.utils.Date.removeTime(a)},setReferenceDate:function(a){this._referenceDate=aria.utils.Date.removeTime(a)},checkValue:function(a){var b=new aria.widgets.controllers.reports.ControllerReport;
if(a==null){b.ok=true;this._dataModel.jsDate=null;this._dataModel.displayText=""}else if(aria.utils.Type.isDate(a)){a=aria.utils.Date.removeTime(a);if(this._minValue&&a<this._minValue){b.ok=false;b.errorMessages.push(this.res.errors["40018_WIDGET_DATEFIELD_MINVALUE"])}else if(this._maxValue&&a>this._maxValue){b.ok=false;b.errorMessages.push(this.res.errors["40019_WIDGET_DATEFIELD_MAXVALUE"])}else{b.ok=true;this._dataModel.jsDate=a;this._dataModel.displayText=aria.utils.Date.format(a,this._pattern)}}else b.ok=
false;if(b.ok){b.text=this._dataModel.displayText;b.value=this._dataModel.jsDate}return b},checkText:function(a){if(a)if(a===this._dataModel.displayText){a=new aria.widgets.controllers.reports.ControllerReport;a.ok=true}else if(a=aria.utils.Date.interpret(a,this._referenceDate))a=this.checkValue(a);else{a=new aria.widgets.controllers.reports.ControllerReport;a.ok=false;a.errorMessages.push(this.res.errors["40008_WIDGET_DATEFIELD_VALIDATION"])}else a=this.checkValue(null);return a},getDisplayTextFromValue:function(a){return a&&
aria.utils.Type.isDate(a)?aria.utils.Date.format(a,this._pattern):""}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/form/MultiSelect.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.form.MultiSelect",$extends:"aria.widgets.form.DropDownTextInput",$dependencies:["aria.widgets.form.list.List","aria.widgets.controllers.MultiSelectController","aria.DomEvent"],$css:["aria.widgets.css."+aria.widgets.AriaSkinInterface.getSkinName()+".MultiSelect","aria.widgets.css."+aria.widgets.AriaSkinInterface.getSkinName()+".List","aria.widgets.css."+aria.widgets.AriaSkinInterface.getSkinName()+".Div","aria.widgets.css."+aria.widgets.AriaSkinInterface.getSkinName()+
".CheckBox"],$constructor:function(a,b,d){if(!this._skinnableClass)this._skinnableClass="MultiSelect";var c=new aria.widgets.controllers.MultiSelectController;a.value=a.value?a.value:[];this.$DropDownTextInput.constructor.call(this,a,b,d,c);c.setListOptions(a.items);c.setSeparator(a.fieldSeparator);c.setFieldDisplay(a.fieldDisplay);c.setValueDisplay(a.valueDisplay);c.checkError();this._listFocused=this.refreshPopup=this._dropDownOpen=false;this._dropDownList=null},$destructor:function(){this._listFocused=
this.refreshPopup=this._dropDownOpen=null;this.$DropDownTextInput.$destructor.call(this);this._dropDownList=null},$prototype:{_clickOnItem:function(){var a=this.controller.checkValue(this.controller.getDataModel().value),b={};b.stopValueProp=true;this._reactToControllerReport(a,b)},_checkCloseItem:function(a){return a.focusIndex===a.closeItem.id?true:false},_keyPressed:function(a){if(a.keyCode==aria.DomEvent.KC_ARROW_UP&&this._checkCloseItem(a)){this.focus();this._toggleDropdown();return true}return false},
_toggleDropdown:function(){this._hasFocus||this.focus();this._reactToControllerReport(this.controller.toggleDropdown(this.getTextInputField().value,this._dropdownPopup!=null),{hasFocus:true})},_renderDropdownContent:function(a){var b=this._cfg,d=this.controller.getDataModel();b=new aria.widgets.form.list.List({defaultTemplate:b.listTemplate,block:true,sclass:"dropdown",onchange:{fn:this._clickOnItem,scope:this},onkeyevent:{fn:this._keyPressed,scope:this},onclose:{fn:this._toggleDropdown,scope:this},
minWidth:this._inputMarkupWidth+15,width:b.popupWidth>0&&b.popupWidth>this._inputMarkupWidth?b.popupWidth:null,multipleSelect:true,maxHeight:250,activateSort:b.activateSort,maxOptions:b.maxOptions,bind:{items:{to:"listContent",inside:d},selectedIndex:{to:"selectedIdx",inside:d},selectedValues:{to:"selectedValues",inside:d}},numberOfColumns:b.numberOfColumns,numberOfRows:b.numberOfRows,displayOptions:b.displayOptions},this._context,this._lineNumber);a.registerBehavior(b);b.writeMarkup(a);this.controller.setListWidget(b);
b.$on({widgetContentReady:{fn:this._refreshPopup,scope:this,args:{list:b}}});this._dropDownList=b},_afterDropdownClose:function(){this.controller.setListWidget(null);if(!this._hasFocus){var a=this.controller.toggleDropdown(this.getTextInputField().value,this._dropdownPopup!=null);a.displayDropDown=false;this._reactToControllerReport(a,{hasFocus:false})}this.$DropDownTextInput._afterDropdownClose.call(this);this._keepFocus=this.refreshPopup=this._dropDownOpen=false},_focusMultiSelect:function(a){this._dropDownOpen&&
this.refreshPopup&&a.focus()},_afterDropdownOpen:function(){this._keepFocus=true;var a=this.controller.getListWidget();this._dropDownOpen=true;this._focusMultiSelect(a)},_refreshPopup:function(a,b){if(this._dropdownPopup){this.refreshPopup=true;this._dropdownPopup.refresh()}this._focusMultiSelect(b.list)},_reactToControllerReport:function(a,b){this.$DropDownTextInput._reactToControllerReport.call(this,a,b)},_widgetContentReady:function(a){this._refreshPopup(a);this._dropDownList.focus()}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/form/PasswordField.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.form.PasswordField",$extends:"aria.widgets.form.TextInput",$constructor:function(a,b,c){var d=new aria.widgets.controllers.TextDataController;this.$TextInput.constructor.call(this,a,b,c,d);this._isPassword=true},$prototype:{}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/form/templates/TemplateMultiSelect.tpl
//YpwKgK3gnz
// Default template for List Widget 
{Template {
	$classpath:'aria.widgets.form.templates.TemplateMultiSelect',
	$hasScript:true
}}
	{macro main()}
		// The Div is used to wrap the items with good looking border.
		{@aria:Div data.cfg}
				
				{section 'Items'}
					
					{if (data.displayOptions.flowOrientation == 'horizontal')}
						// with columns, horizontal
						<table>
						{foreach item inView data.itemsView}
					
							{if item_index % data.numberOfColumns == 0}
								<tr>
							{/if}
							<td>{call renderItem(item, item_info.initIndex)/}</td>
							
							{if (data.displayOptions.tableMode == true)}  
								{var checkboxLabelSplit = item.label.split('|')/}
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[0]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[1]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[2]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[3]}</td>
							{/if} 
							
							{if (item_index + 1) % data.numberOfColumns == 0}
								</tr>
							{/if}
						{/foreach}
						</table>
					{elseif (data.displayOptions.flowOrientation == 'vertical')/}
					
						{var lineCount = data.numberOfRows /}
						{var columnCount = data.numberOfColumns /}
						{var outputCount = 0 /}
						{var outputRows = 1 /}

						<table>
							
						{for var i = 0 ; i < lineCount ; i++}
					
							<tr>
							{var lastColCount = 0 /}
							{for var j = 0 ; j < columnCount ; j++ }
								<td>
								{var itemIndex = (j*lineCount)+i/}					
								{if (itemIndex < data.itemsView.items.length)}
									{var item = data.itemsView.items[itemIndex].value/} 
									{call renderItem(item, itemIndex)/}
								{/if}
								{set outputCount = outputCount + 1/}
								</td>								
							{/for}
							{set outputRows = outputRows + 1/}
							</tr>
						{/for}
						</table>
					{else/}
					
						{foreach item inView data.itemsView}
							{call renderItem(item, item_info.initIndex)/}
						{/foreach}

					{/if}
					
				{/section}
				{if (data.displayOptions.displayFooter)}											
					{call footer()/}
				{/if}
		{/@aria:Div}
	{/macro}	
	
	{macro renderItem(item)}
 		
		{var checkboxLabel = "Error"/}
		{if (data.displayOptions.listDisplay == 'code')}
			{set checkboxLabel = item.value/}
		{elseif (data.displayOptions.listDisplay == 'label')/}
			{set checkboxLabel = item.label/}
		{elseif (data.displayOptions.listDisplay == 'both')/}
			{set checkboxLabel = item.label + " (" + item.value + ") " /}
		{/if}
		{if (data.displayOptions.tableMode == true)}  
			{set checkboxLabel = ""/}
		{/if} 
			
								
		{@aria:CheckBox {										
			label: checkboxLabel,				
			onchange: {
				fn: "itemClick",					
				args: {
					item : item,
					itemIdx : item.index
				}
			},	
			id: 'listItem' + item.index, 																						
			bind:{
				"value": {
					inside: item, to: 'selected'
				},
				"disabled" : {
					inside : item, to: "currentlyDisabled"
					}
			},
			value: item.selected
		}/}
		
	{/macro}
		
	{macro footer()}		
		<div class="${data.skin.cssClassFooter}">
			<div style="width:120px">
				{@aria:Link { 
					label : "Select All",
					sclass : 'multiSelectFooter',
					onclick : {
						fn : "selectAll",
						scope : moduleCtrl	
					}
				}/}
			</div>	
			<span style="position:absolute;right:2px;text-align:right;">		
				{@aria:Link { 
					label:"Close",
					sclass : 'multiSelectFooter',
					onclick: {
						fn: "close",
						scope: moduleCtrl
					}
				}/}						
			</span>				
			<span>
				{@aria:Link {
					label:"Deselect All",
					sclass : 'multiSelectFooter',
					onclick: {
						fn: "deselectAll",
						scope: moduleCtrl
					}
				}/}						
			</span>						
		</div>
	{/macro}
	
{/Template}

//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/form/templates/TemplateMultiSelectScript.js
//YpwKgK3gnz
Aria.tplScriptDefinition({$classpath:"aria.widgets.form.templates.TemplateMultiSelectScript",$constructor:function(){this._refContainer="myList";this._itemShift=1},$prototype:{onModuleEvent:function(a){if(a.name=="onChange")!a.selectedIndexes&&!a.unselectedIndexes&&this.$refresh({filterSection:"Items"});else if(a.name=="focusList"){var b=this.data.focusIndex?this.data.focusIndex:0;a=this.data.itemsView.items[b].value.index;this.$focus("listItem"+a)}else if(a.name=="keyevent")if(a.keyCode==aria.DomEvent.KC_ARROW_UP&&
a.focusIndex==0){a.cancelDefault=true;a=this.data.itemsView.items[b].value.index;this.$focus("listItem"+a)}},itemTableClick:function(a,b){this.itemClick(a,b,false)},itemClick:function(a,b,c){if(c==null)c=true;this.data.disabled||this.moduleCtrl.itemClick(b.itemIdx,c)},_getClassForItem:function(a){var b=[this.data.skin.cssClassItem];a.selected&&b.push(this.data.skin.cssClassSelected);this.data.disabled?b.push(this.data.skin.cssClassDisabled):b.push(this.data.skin.cssClassEnabled);return b.join(" ")}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/IconLib.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.IconLib",$dependencies:["aria.widgets.AriaLib"],$singleton:true,$onload:function(){},$constructor:function(){this._sprites={iconsSTD:{cssClass:"xICNstd",spriteURL:null,spriteSpacing:2,iconWidth:16,iconHeight:16,biDimensional:false,direction:"x",content:{amn_air:0,amn_bar:1,amn_bus:2,amn_chi:3,amn_hea:4,amn_gym:4,amn_lau:5,amn_mee:6,amn_par:7,amn_pch:8,amn_pet:9,amn_res:10,amn_roo:11,amn_saf:12,amn_sea:13,amn_spa:14,amn_swi:15,amn_wif:16,info:17,fire:18,
add_line:19,rm_line:20,zoom_in:21,zoom_out:22,save:23,close:24,undo:25,redo:26,baby:27,extended_seat:28,hand_bag:29,expand:30,collapse:31,left_arrow:32,down_arrow:33,right_arrow:34,up_arrow:35,validated:36,warning:37}},iconsPb13x19:{cssClass:"xICNPB13x19",spriteURL:null,spriteSpacing:2,iconWidth:13,iconHeight:19,biDimensional:true,content:{no1:"0_0",no2:"0_1",no3:"0_2",no4:"1_0",no5:"1_1",no6:"1_2"}},fieldstd:{cssClass:"xTINbkg_std",spriteURL:null,spriteSpacing:2,iconWidth:2E3,iconHeight:20,biDimensional:false,
direction:"y",content:{normal:0,mandatory:1,normalFocus:2,mandatoryFocus:3,normalError:4,mandatoryError:5,disabled:6,readOnly:7}},ariaButton:{cssClass:"xBTN",spriteURL:null,spriteSpacing:2,iconWidth:1E3,iconHeight:25,biDimensional:false,direction:"y",content:{normal:0,pushed:1,disabled:2}},field1aBlue:{cssClass:"xTINbkg_1aBlue",spriteURL:null,spriteSpacing:2,iconWidth:800,iconHeight:22,biDimensional:false,direction:"y",content:{normal:0,normalFocus:1}}}},$prototype:{registerSprite:function(c){var a;
if(!c)return false;if(this._sprites[c.name]!==undefined){this.$logError("Sprite already exists");return false}if(aria.core.JsonValidator.normalize({json:c,beanName:"aria.widgets.CfgBeans.SpriteCfg"})){if(c.biDimensional)for(a in c.content){if(!(typeof c.content[a]==="string"&&c.content[a].match(/^\d+_\d+$/))){this.$logError("Bidimensional sprites must have positionings in the following format: x_y");return false}}else for(a in c.content)if(typeof c.content[a]!=="number"){this.$logError("single-dimensional sprites must have numerical positionings.");
return false}this._sprites[c.name]=c;delete c.name;return true}return false},_deleteSprite:function(c){if(this._sprites[c]){delete this._sprites[c];return true}return false},getIcon:function(c,a){var b=this._sprites[c],d,e=0,f=0;if(b&&(d=b.content[a])!==undefined){if(b.biDimensional){d=d.split("_");e=(b.iconWidth+b.spriteSpacing)*d[0];f=(b.iconHeight+b.spriteSpacing)*d[1]}else if(b.direction==="x")e=(b.iconWidth+b.spriteSpacing)*d;else if(b.direction==="y")f=(b.iconHeight+b.spriteSpacing)*d;b=null;
return{iconLeft:e,iconTop:f,cssClass:b.cssClass,spriteURL:b.spriteURL,width:b.iconWidth,height:b.iconHeight}}return false},writeMarkup:function(c){var a,b=0,d=0,e,f;for(f in this._sprites){a=this._sprites[f];c.write("<h3>"+f+"</h3>");for(var g in a.content){e=a.content[g];if(a.biDimensional){d=e.split("_");b=(a.iconWidth+a.spriteSpacing)*d[0];d=(a.iconHeight+a.spriteSpacing)*d[1]}else if(a.direction==="x")b=(a.iconWidth+a.spriteSpacing)*e;else if(a.direction==="y")d=(a.iconHeight+a.spriteSpacing)*
e;c.write(['<span style="display:inline-block;',a.iconWidth<600?"width:"+(a.iconWidth+100)+"px;":"",'"><span ',a.cssClass?'class="'+a.cssClass+'" ':"",'style="',a.spriteURL?"background:url("+a.spriteURL+") no-repeat;":"","margin:1px;display:inline-block;width:",a.iconWidth,"px;height:",a.iconHeight,"px;background-position:-",b,"px -",d,'px;"></span> ',g,"</span>"].join(""))}c.write("<br /><br/>")}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/transform/NotTransform.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.widgets.transform.NotTransform",$constructor:function(){this.$JsObject.constructor.call(this)},$prototype:{toWidget:function(a){return!a},fromWidget:function(a){return!a}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/widgets/container/Tooltip.js
//YpwKgK3gnz
(function(){var d={},c;Aria.classDefinition({$classpath:"aria.widgets.container.Tooltip",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.container.Div","aria.popups.Popup"],$onload:function(){c=aria.core.Timer},$onunload:function(){c=d=null},$constructor:function(){this.$Container.constructor.apply(this,arguments);this._popup=this._showTimeout=this._associatedWidget=null},$destructor:function(){this._cfgOk=false;if(this._showTimeout){c.cancelCallback(this._showTimeout);this._showTimeout=
null}this._popup&&this._popup.close();this._associatedWidget=null;this.$Container.$destructor.call(this)},$statics:{WIDGET_TOOLTIP_MACRO:"%1Tooltip with id '%2' must either be a container or have the 'macro' property specified."},$prototype:{_checkCfgConsistency:function(){if(this._cfgOk){var a=this._cfg;if(this._container&&a.macro||!this._container&&!a.macro){this.$logError(this.WIDGET_TOOLTIP_MACRO,[a.id]);this._cfgOk=false}}},_widgetMarkupBegin:function(a){var b=this._cfg;this._sectionId=["__toolTipSection_",
b.id].join("");this._skipContent=a.sectionState==a.SECTION_KEEP||!d[this._domId];a.skipContent=this._skipContent;a.beginSection({id:this._sectionId,type:""});if(!this._skipContent){this._tooltipDiv=b=new aria.widgets.container.Div({sclass:b.sclass,width:b.width,height:b.height,printOptions:b.printOptions,cssClass:this._context.getCSSClassNames(true)},this._context,this._lineNumber);a.registerBehavior(b);b.writeMarkupBegin(a)}},_widgetMarkupEnd:function(a){if(!this._skipContent){var b=this._tooltipDiv;
this._tooltipDiv=null;b.writeMarkupEnd(a);this.$assert(52,b)}a.endSection()},_writerCallback:function(a){this._widgetMarkupBegin(a);a.callMacro(this._cfg.macro);this._widgetMarkupEnd(a)},writeMarkup:function(a){this._container=false;this._checkCfgConsistency();if(this._cfgOk){this._widgetMarkupBegin(a);this._widgetMarkupEnd(a)}},writeMarkupBegin:function(a){this._container=true;this._checkCfgConsistency();this._cfgOk&&this._widgetMarkupBegin(a)},writeMarkupEnd:function(a){this._widgetMarkupEnd(a)},
associatedWidgetMouseOver:function(a,b){if(this._cfgOk){this._popup&&this._associatedWidget==a&&this._popup.cancelMouseOutTimer();if(!this._showTimeout)this._showTimeout=c.addCallback({scope:this,fn:this.showTooltip,args:{widget:a,absolutePosition:{left:b.clientX,top:b.clientY}},delay:this._cfg.showDelay})}},associatedWidgetMouseMove:function(a,b){if(this._cfgOk)if(this._showTimeout&&this._cfg.showOnlyOnMouseStill){c.cancelCallback(this._showTimeout);this._showTimeout=c.addCallback({scope:this,fn:this.showTooltip,
args:{widget:a,absolutePosition:{left:b.clientX,top:b.clientY}},delay:this._cfg.showDelay})}},associatedWidgetMouseOut:function(a,b){if(this._cfgOk){this._popup&&this._popup.closeOnMouseOut(b);if(this._showTimeout){c.cancelCallback(this._showTimeout);this._showTimeout=null}}},showTooltip:function(a){if(this._cfgOk){this._showTimeout=null;var b=a.absolutePosition;a=a.widget;if(this._associatedWidget!=a){this.closeTooltip();this._associatedWidget=a}if(!this._popup){a={filterSection:this._sectionId};
if(!this._container){a.writerCallback={fn:this._writerCallback,scope:this};a.outputSection=this._sectionId}d[this._domId]=true;a=this._context.getRefreshedSection(a);var e=this._cfg,f=new aria.popups.Popup;this._popup=f;f.$on({scope:this,onAfterClose:this._onAfterPopupClose});f.open({section:a,keepSection:true,absolutePosition:b,closeOnMouseClick:e.closeOnMouseClick,closeOnMouseScroll:e.closeOnMouseScroll,closeOnMouseOut:e.closeOnMouseOut,closeOnMouseOutDelay:e.closeOnMouseOutDelay,offset:{left:0,
top:16}})}}},closeTooltip:function(){this._popup&&this._popup.close()},_onAfterPopupClose:function(){this._popup.$dispose();d[this._domId]=false;delete d[this._domId];this._popup=null}}})})();
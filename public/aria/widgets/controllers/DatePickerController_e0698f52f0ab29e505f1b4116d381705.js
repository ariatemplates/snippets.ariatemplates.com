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
Aria.classDefinition({$classpath:"aria.widgets.controllers.DatePickerController",$dependencies:["aria.widgets.controllers.reports.ControllerReport","aria.utils.Json"],$extends:"aria.widgets.controllers.DateController",$constructor:function(){this.$DateController.constructor.call(this);this._calendar=null;this._dataModel.calendarValue=null},$destructor:function(){this._calendar=null;this.$DateController.$destructor.call(this)},$prototype:{setCalendar:function(b){this._calendar=b},checkText:function(){var b=
this.$DateController.checkText.apply(this,arguments);b.ok&&aria.utils.Json.setValue(this._dataModel,"calendarValue",this._dataModel.jsDate);return b},checkValue:function(){var b=this.$DateController.checkValue.apply(this,arguments);b.ok&&aria.utils.Json.setValue(this._dataModel,"calendarValue",this._dataModel.jsDate);return b},checkKeyStroke:function(b,d,c){if(this._calendar){if(d==13||b==32||d==9){var a=this.checkValue(this._dataModel.calendarValue);a.displayDropDown=false;a.cancelKeyStroke=d!=9}else{a=
new aria.widgets.controllers.reports.ControllerReport;a.text=c;if(d==27){a.displayDropDown=false;a.caretPosStart=0;a.caretPosEnd=c.length}else a.cancelKeyStroke=this._calendar.sendKey(b,d);a.text=c}return a}else if(d==40){a=this.checkText(c);a.cancelKeyStroke=true;a.displayDropDown=true;return a}else return this.$DateController.checkKeyStroke.apply(this,arguments)},toggleDropdown:function(b,d){var c=this.checkText(b);c.displayDropDown=!d;c.ok=c.ok||!b;return c}}});
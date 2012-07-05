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
Aria.tplScriptDefinition({$classpath:"aria.widgets.calendar.CalendarTemplateScript",$prototype:{onModuleEvent:function(a){if(a.name=="update"){var b=a.properties.value;if(a.propertiesNbr==1&&b){this.updateClass(b.oldValuePosition);this.updateClass(b.newValuePosition);a.propertyshowShortcuts&&this.$refresh({outputSection:"selectedDay"})}else this.$refresh()}},updateClass:function(a){if(!(a==null||a.month==null)){var b=this.$getChild("month_"+a.month.monthKey,a.weekInMonthIndex),c=b.getChild((this.settings.showWeekNumbers?
1:0)+a.dayInWeekIndex);c.classList.setClassName(this.getClassForDay(a.day));c.$dispose();b.$dispose()}},clickDay:function(a){(a=a.target.getExpando("date"))&&this.moduleCtrl.dateClick({date:new Date(parseInt(a))})},getClassForDay:function(a){var b=[],c=this.skin.baseCSS;b.push(c+"day");b.push(c+"mouseOut");a.isWeekend&&a.isSelectable&&b.push(c+"weekEnd");a.isSelected&&b.push(c+"selected");a.isToday&&b.push(c+"today");b.push(a.isSelectable?c+"selectable":c+"unselectable");return b.join(" ")},mouseOverDay:function(a){a.target.getExpando("date")&&
a.target.classList.setClassName(a.target.getClassName().replace(this.skin.baseCSS+"mouseOut",this.skin.baseCSS+"mouseOver"))},mouseOutDay:function(a){a.target.getExpando("date")&&a.target.classList.setClassName(a.target.getClassName().replace(this.skin.baseCSS+"mouseOver",this.skin.baseCSS+"mouseOut"))}}});
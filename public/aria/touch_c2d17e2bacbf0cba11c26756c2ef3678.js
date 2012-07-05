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
//LOGICAL-PATH:aria/touch/Event.js
//YpwKgK3gnz
Aria.classDefinition({$singleton:true,$classpath:"aria.touch.Event",$constructor:function(){this.touchEventMap={touchstart:"touchstart",touchend:"touchend",touchmove:"touchmove"};this.touch=true;this.__touchDetection()},$prototype:{__touchDetection:function(){this.touch="ontouchstart"in Aria.$frameworkWindow||Aria.$frameworkWindow.DocumentTouch&&Aria.$frameworkWindow.document instanceof Aria.$frameworkWindow.DocumentTouch;if(!this.touch)this.touchEventMap={touchstart:"mousedown",touchend:"mouseup",
touchmove:"mousemove"}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/Swipe.js
//YpwKgK3gnz
Aria.classDefinition({$singleton:true,$classpath:"aria.touch.Swipe",$dependencies:["aria.utils.Event","aria.utils.Delegate","aria.utils.AriaWindow","aria.touch.Event"],$events:{swipestart:{description:"Raised when a user starts to swipe.",properties:{startX:"The pageX/clientX value of the swipe start event.",startY:"The pageY/clientY value of the swipe start event.",originalEvent:"The originating touchstart event."}},swipemove:{description:"Raised when a user is swiping.",properties:{route:"Contains the direction and the distance of the swipe from the swipe start to the current swipe event coordinates.",
originalEvent:"The originating touchmove event."}},swipeend:{description:"Raised when a user completes a swipe",properties:{route:"Contains the direction and the distance of the swipe from the swipe start to the current swipe event coordinates.",originalEvent:"The originating touchend event."}},swipecancel:{description:"Raised when a swipe is cancelled or completed and the listeners for the event need to be removed."}},$constructor:function(){this.body={};this.touchEventMap=aria.touch.Event.touchEventMap;
var a=aria.utils.AriaWindow;a.$on({attachWindow:this._connectTouchEvents,detachWindow:this._disconnectTouchEvents,scope:this});a.isWindowUsed&&this._connectTouchEvents()},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this);this._disconnectTouchEvents();this.touchEventMap=this.body=null},$statics:{MARGIN:20},$prototype:{_connectTouchEvents:function(){this.body=Aria.$window.document.body;aria.utils.Event.addListener(this.body,this.touchEventMap.touchstart,{fn:this._swipeStart,scope:this})},
_disconnectTouchEvents:function(){aria.utils.Event.removeListener(this.body,this.touchEventMap.touchstart,{fn:this._swipeStart,scope:this});this._swipeCancel()},_swipeStart:function(a){var b={startX:a.pageX?a.pageX:a.clientX,startY:a.pageY?a.pageY:a.clientY,start:(new Date).getTime()};aria.utils.Event.addListener(this.body,this.touchEventMap.touchmove,{fn:this._swipeMove,scope:this,args:b});aria.utils.Event.addListener(this.body,this.touchEventMap.touchend,{fn:this._swipeEnd,scope:this,args:b});this.$raiseEvent({name:"swipestart",
startX:b.startX,startY:b.startY,originalEvent:a})},_swipeEnd:function(a,b){var e=(new Date).getTime()-b.start;b.eventType="swipeend";var c=this._getRoute(b),f=false;if(c){var d=aria.DomEvent.getFakeEvent("swipe",a.target?a.target:a.srcElement);f=a.returnValue;d.duration=e;d.distance=c.distance;d.direction=c.direction;d.startX=c.startX;d.startY=c.startY;d.endX=c.endX;d.endY=c.endY;aria.utils.Delegate.delegate(d);a.cancelBubble=d.hasStopPropagation;a.returnValue=!d.hasPreventDefault;this.$raiseEvent({name:"swipeend",
route:c,originalEvent:a})}this._swipeCancel();return f},_swipeCancel:function(){for(var a=true;a;)a=aria.utils.Event.removeListener(this.body,this.touchEventMap.touchend,{fn:this._swipeEnd,scope:this});for(a=true;a;)a=aria.utils.Event.removeListener(this.body,this.touchEventMap.touchmove,{fn:this._swipeMove,scope:this});this.$raiseEvent({name:"swipecancel"})},_swipeMove:function(a,b){b.endX=a.pageX?a.pageX:a.clientX;b.endY=a.pageY?a.pageY:a.clientY;b.eventType="swipemove";var e=this._getRoute(b);
e?this.$raiseEvent({name:"swipemove",route:e,originalEvent:a}):this._swipeCancel()},_getRoute:function(a){var b=a.endX-a.startX,e=a.endY-a.startY,c=Math.abs(b),f=Math.abs(e);if(a.eventType==="swipemove")return{direction:"unknown",distance:"0",startX:a.startX,startY:a.startY,endX:a.endX,endY:a.endY};if(f>c&&c<=this.MARGIN)return{direction:e<0?"up":"down",distance:f,startX:a.startX,startY:a.startY,endX:a.endX,endY:a.endY};if(c>f&&f<=this.MARGIN)return{direction:b<0?"left":"right",distance:c,startX:a.startX,
startY:a.startY,endX:a.endX,endY:a.endY};return false}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/Tap.js
//YpwKgK3gnz
Aria.classDefinition({$singleton:true,$classpath:"aria.touch.Tap",$dependencies:["aria.utils.Event","aria.utils.Delegate","aria.utils.AriaWindow","aria.touch.Event"],$constructor:function(){this.body={};this.touchEventMap=aria.touch.Event.touchEventMap;var a=aria.utils.AriaWindow;a.$on({attachWindow:this._connectTouchEvents,detachWindow:this._disconnectTouchEvents,scope:this});a.isWindowUsed&&this._connectTouchEvents()},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this);this._disconnectTouchEvents();
this.touchEventMap=this.body=null},$prototype:{_connectTouchEvents:function(){this.body=Aria.$window.document.body;aria.utils.Event.addListener(this.body,this.touchEventMap.touchstart,{fn:this._tapStart,scope:this});aria.utils.Event.addListener(this.body,this.touchEventMap.touchmove,{fn:this._tapCancel,scope:this})},_disconnectTouchEvents:function(){aria.utils.Event.removeListener(this.body,this.touchEventMap.touchstart,{fn:this._tapStart,scope:this});aria.utils.Event.removeListener(this.body,this.touchEventMap.touchmove,
{fn:this._tapCancel,scope:this});this._tapCancel()},_tapStart:function(){var a={start:(new Date).getTime()};aria.utils.Event.addListener(this.body,this.touchEventMap.touchend,{fn:this._tapEnd,scope:this,args:a})},_tapEnd:function(a,c){this._tapCancel();if((new Date).getTime()-c.start<1E3){var b=aria.DomEvent.getFakeEvent("tap",a.target?a.target:a.srcElement);b.pageX=a.pageX;b.pageY=a.pageY;b.clientX=a.clientX;b.clientY=a.clientY;aria.utils.Delegate.delegate(b);a.cancelBubble=b.hasStopPropagation;
a.returnValue=!b.hasPreventDefault;return a.returnValue}},_tapCancel:function(){for(var a=true;a;)a=aria.utils.Event.removeListener(this.body,this.touchEventMap.touchend,{fn:this._tapEnd,scope:this})}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/widgets/Slider.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.touch.widgets.Slider",$extends:"aria.widgetLibs.BaseWidget",$css:["aria.touch.widgets.SliderCSS"],$statics:{INVALID_CONFIGURATION:"Invalid configuration for the slider!",BUTTON_WIDTH:14},$dependencies:["aria.touch.widgets.SliderCfgBeans","aria.touch.Swipe"],$constructor:function(){this.$BaseWidget.constructor.apply(this,arguments);var a={beanName:"aria.touch.widgets.SliderCfgBeans.SliderCfg",json:this._cfg};try{this._cfgOk=aria.core.JsonValidator.normalize(a,
true)}catch(b){this.$logError(this.INVALID_CONFIGURATION,null,b)}if(this._cfgOk){this._maxLeftPosition=this._cfg.width-this.BUTTON_WIDTH;if(this._maxLeftPosition<10)this._maxLeftPosition=10;if(a=this._cfg.bindValue){this._bindingCallback={fn:this._notifyDataChange,scope:this};aria.utils.Json.addListener(a.inside,a.to,this._bindingCallback,false)}this._value=null;this._readValue();this._leftPosition=null;this._setLeftPosition(this._value*this._maxLeftPosition);this._domId=this._createDynamicId();this._parentDomId=
this._createDynamicId();this._savedX=this._domElt=null;this._needUpdate=false;a=aria.utils.AriaWindow;a.$on({attachWindow:this._attachBodyEvents,detachWindow:this._detachBodyEvents,scope:this});a.isWindowUsed&&this._attachBodyEvents()}},$destructor:function(){this._detachBodyEvents();if(this._bindingCallback){var a=this._cfg.bindValue;aria.utils.Json.removeListener(a.inside,a.to,this._bindingCallback,false);this._bindingCallback=null}this._needUpdate=this._savedX=this._domId=this._leftPosition=this._value=
this._cfg=this._maxLeftPosition=this._cfgOk=this._domElt=null;this.$BaseWidget.$destructor.call(this)},$prototype:{writeMarkup:function(a){this._cfgOk&&a.write(['<div class="touchLibSlider" style="width:',this._maxLeftPosition+this.BUTTON_WIDTH,'px;" id="',this._parentDomId,'"><span id="',this._domId,'" class="sliderButton" style="left:',this._leftPosition,'px;">&nbsp;</span></div>'].join(""))},_attachBodyEvents:function(){aria.touch.Swipe.$on({swipestart:{fn:this._dom_onswipestart,scope:this},swipecancel:{fn:this._dom_onswipecancel,
scope:this}})},_detachBodyEvents:function(){aria.touch.Swipe.$unregisterListeners(this)},_dom_onswipestart:function(a){var b=this.getButtonDom();if((a.originalEvent.target?a.originalEvent.target:a.originalEvent.srcElement).id===b.id){a.originalEvent.preventDefault?a.originalEvent.preventDefault():a.originalEvent.returnValue=false;this._savedX=a.startX;this._updateDisplay();aria.touch.Swipe.$on({swipemove:{fn:this._dom_onswipemove,scope:this},swipeend:{fn:this._dom_onswipeend,scope:this}})}},_dom_onswipemove:function(a){var b=
this.getButtonDom(),c=a.originalEvent.target?a.originalEvent.target:a.originalEvent.srcElement;if(c.id===b.id||b.parentNode.id&&c.id===b.parentNode.id){a.originalEvent.preventDefault?a.originalEvent.preventDefault():a.originalEvent.returnValue=false;b=this._leftPosition;this._setLeftPosition(this._leftPosition+(a.route.endX-this._savedX));this._savedX+=this._leftPosition-b;this._updateDisplay();this._setValue(this._leftPosition/this._maxLeftPosition)}},_dom_onswipeend:function(a){this._dom_onswipecancel();
var b=this.getButtonDom();if((a.originalEvent.target?a.originalEvent.target:a.originalEvent.srcElement).id===b.id){a.originalEvent.preventDefault?a.originalEvent.preventDefault():a.originalEvent.returnValue=false;this._updateDisplay();this._setValue(this._leftPosition/this._maxLeftPosition)}},_dom_onswipecancel:function(){this._detachBodyEvents();this._attachBodyEvents()},_setLeftPosition:function(a){if(a>this._maxLeftPosition)a=this._maxLeftPosition;else if(a<0)a=0;this._leftPosition=a},_setValue:function(a){if(a!==
this._value){this._value=a;var b=this._cfg.bindValue;b&&aria.utils.Json.setValue(b.inside,b.to,a)}},_readValue:function(){var a=this._value,b=this._cfg.bindValue;if(b)a=b.inside[b.to];if(a===null)a=0;if(a<0)a=0;if(a>1)a=1;this._value=a},_notifyDataChange:function(){this._readValue();this._setLeftPosition(this._value*this._maxLeftPosition);this._updateDisplay()},_updateDisplay:function(){var a=this.getButtonDom();if(a){var b="sliderButton";b+=" down";if(a.className!=b)a.className=b;b=this._leftPosition+
"px";if(a.style.left!=b)a.style.left=b}else this._needUpdate=true},initWidget:function(){this._needUpdate&&this._updateDisplay()},getButtonDom:function(){var a=this._domElt;if(a===null)this._domElt=a=aria.utils.Dom.getElementById(this._domId);return a},getDom:function(){return this.getButtonDom().parentNode}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/widgets/SliderCfgBeans.js
//YpwKgK3gnz
Aria.beanDefinitions({$package:"aria.touch.widgets.SliderCfgBeans",$description:"Slider config beans",$namespaces:{json:"aria.core.JsonTypes"},$beans:{SliderCfg:{$type:"json:Object",$description:"Configuration of the slider widget.",$properties:{width:{$type:"json:Integer",$description:"Width to use for the widget.",$default:100},bindValue:{$type:"json:Object",$description:"Binding for the value of the slider.",$properties:{inside:{$type:"json:ObjectRef",$description:"Reference to the object that holds the property to bind to.",
$mandatory:true},to:{$type:"json:String",$description:"Name of the JSON property to bind to.",$mandatory:true}}}}}}});
//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/widgets/SliderCSS.tpl.css
//YpwKgK3gnz
{CSSTemplate {
	$classpath : "aria.touch.widgets.SliderCSS"
}}

	{macro main()}

		div.touchLibSlider {
		    background: none repeat scroll 0 0 #EFF9FF;
		    border: 2px solid #999999;
		    border-radius: 32px 32px 32px 32px;
		    height: 17px;
		}

		div.touchLibSlider span {
			position: absolute;
		}

		div.touchLibSlider span.sliderButton {
			background: none repeat scroll 0 0 #ffffff;
		  border: 2px solid #4776A7;
		  border-radius: 32px 32px 32px 32px;
		  width: 14px;
		}

	{/macro}

{/CSSTemplate}

//YpwKgK3gnz
//LOGICAL-PATH:aria/touch/widgets/TouchWidgetLib.js
//YpwKgK3gnz
Aria.classDefinition({$classpath:"aria.touch.widgets.TouchWidgetLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:true,$prototype:{widgets:{Slider:"aria.touch.widgets.Slider"}}});
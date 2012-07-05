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
Aria.interfaceDefinition({$classpath:"aria.storage.IStorage",$events:{change:{description:"Raised when the storage area changes because an item is set or removed, or the storage is cleared.",properties:{key:"Name of the key that changed",oldValue:"Old value of the key in question, null if the key is newly added",newValue:"New value being set",url:"Address of the document whose storage object was affected"}}},$interface:{getItem:function(){},setItem:function(){},removeItem:function(){},clear:function(){}}});
/**
 * @author Keloran
 */
Hammer._eventsFactory = {
	fix : function(event) {
		if (!event) { event = window.event; }
		if (event.target) {
			if (event.target.nodeType == 3) { event.target = event.target.parentNode; }
		} else if (event.srcElement) {
			event.target = event.srcElement;
		}
		return event;
	},

	register : function(element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false);
		} else if (element.attachEvent) {
			if (!element._listeners) { element._listeners = new Array(); }
			if (!element._listeners[type]) { element._listeners[type] = new Array(); }
			var workaroundFunc = function() { func.apply(element, new Array()); }
			element._listeners[type][func] = workaroundFunc;
			element.attachEvent('on' + type, workaroundFunc);
		}
	},

	unregister : function(element, type, func) {
		if (element.removeEventListener) {
			element.removeEventListener(type, func, false);
		} else if (element.detachEvent) {
			if (element._listeners && element._listeners[type] && element._listeners[type][func]) {
				element.detachEvent('on' + type, element._listeners[type][func]);
			}
		}
	}
}
/*
     FILE ARCHIVED ON 02:41:19 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:35 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
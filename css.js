/**
 * @author Keloran
 */
Hammer._cssFactory = {
	readStyle : function(element, property) {
		if (element.style[property]) {
			return element.style[property];
		} else if (element.currentStyle) {
			return element.currentStyle[property];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var style = document.defaultView.getComputedStyle(element, null);
			return style.getPropertyValue(property);
		} else {
			return null;
		}
	}
}
/*
     FILE ARCHIVED ON 02:38:59 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:35 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * @author Keloran
 */

var Hammer = {
	events : function() {
		if (!Hammer._eventsFactory) { throw "Events module not found"; }
		return Hammer._eventsFactory;
	},

	css : function() {
		if (!Hammer._cssFactory) { throw "CSS module not found"; }
		return Hammer._cssFactory;
	},

	coordinates : function() {
		if (!Hammer._coordinatesFactory) { throw "Coordinates module not found"; }
		return Hammer._coordinatesFactory;
	},

	drag : function() {
		if (!Hammer._dragFactory) { throw "Drag module not found"; }
		return Hammer._dragFactory;
	},

	dragsort : function() {
		if (!Hammer._dragsortFactory) { throw "Drag and Sort module not found"; }
		return Hammer._dragsortFactory;
	},

	helpers : function() {
		return Hammer._helpers;
	},

	cookies : function() {
		if (!Hammer._cookiesFactory) { throw "Cookies module not found"; }
		return Hammer._cookiesFactory;
	},

	junkpile : function() {
		return Hammer._junkpile;
	},

	slider : function() {
		if (!Hammer._sliderFactory) { throw "Slider module not found"; }
		return Hammer._sliderFactory;
	}
}

Hammer._helpers = {
	map : function(array, func) {
		for (var i = 0, n = array.length; i < n; i++) { func(array[i]); }
	},

	nextItem : function(item, nodeName) {
		if (item == null) { return; }
		var next = item.nextSibling;
		while (next != null) {
			if (next.nodeName == nodeName) { return next; }
			next = next.nextSibling;
		}
		return null;
	},

	previousItem : function(item, nodeName) {
		var previous = item.previousSibling;
		while (previous != null) {
			if (previous.nodeName == nodeName) { return previous; }
			previous = previous.previousSibling;
		}
		return null;
	},

	moveBefore : function(item1, item2) {
		var parent = item1.parentNode;
		parent.removeChild(item1);
		parent.insertBefore(item1, item2);
	},

	moveAfter : function(item1, item2) {
		var parent = item1.parentNode;
		parent.removeChild(item2);
		parent.insertBefore(item1, item2 ? item2.nextSibling : null);
	}
}

Hammer._junkpile = {
	serializeList : function(list) {
		var items = list.getElementsByTagName("li");
		var array = new Array();
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i];
			array.push(Hammer.junkpile()._identifier(item));
		}
		return array.join('|');
	},

	inspectListOrder : function(id) {
		alert(Hammer.junkpile().seralizeList(document.getElementById(id)));
	},

	restoreListOrder : function(listId) {
		var list = document.getElementById(listId);
		if (list == null) { return; }

		var cookie = Hammer.cookies().get("list-" + listId);
		if (!cookie) { return; }

		var IDs = cookie.split('|');
		var items = Hammer.junkpile()._itemsById(list);

		for (var i = 0, n = IDs.length; i < n; i++) {
			var itemId = IDs[i];
			if (itemId in items) {
				var item = items[itemId];
				list.removeChild(item);
				list.insertBefore(item, null);
			}
		}
	},

	_identifier : function(item) {
		var trim = Hammer.junkpile().trim;
		var identifier;

		identifier = trim(item.getAttribute("id"));
		if (identifier != null && identifier.length > 0) { return identifier; }

		identifier = trim(item.getAttribute("itemId"));
		if (identifier != null && identifier.length > 0) { return identifier; }

		return trim(item.innerHTML);
	},

	_itemsById : function(list) {
		var array = new Array();
		var items = list.getElementsByTagName('li');
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i];
			array[Hammer.junkpile()._identifier(item)] = item;
		}
		return array;
	},

	trim : function(text) {
		if (text == null) { return null; }
		return text.replace(/^(\s+)?(.*\S)(\s+)?$/, '$2');
	}
}

/**
 * General Short functions
 */
function xGetElementById(elem) {
	if(typeof(elem) != 'string') { return elem; }
	
	if(document.getElementById) {
		elemReturn = document.getElementById(elem);
	} else if(document.all) {
		elemReturn = document.all[elem];
	}else {
		elemReturn = null;
	}
	return elemReturn;
}
/*
     FILE ARCHIVED ON 02:45:00 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:35 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
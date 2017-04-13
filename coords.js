/**
 * @author Keloran
 */
Hammer._coordinatesFactory = {
	create : function(x, y) {
		return new _HammerCoordinate(this, x, y);
	},

	origin : function() {
		return this.create(0, 0);
	},

	topLeftPosition : function(element) {
		var left = parseInt(Hammer.css().readStyle(element, "left"));
		var left = isNaN(left) ? 0 : left;

		var top = parseInt(Hammer.css().readStyle(element, "top"));
		var top = isNaN(top) ? 0 : top;

		return this.create(left, top);
	},

	bottomRightPosition : function(element) {
		return this.topLeftPosition(element).plus(this.size(element));
	},

	topLeftOffset : function(element) {
		var offset = this._offset(element);

		var parent = element.offsetParent;
		while (parent) {
			offset = offset.plus(this._offset(parent));
			parent = parent.offsetParent;
		}
		return offset;
	},

	bottomRightOffset : function(element) {
		return this.topLeftOffset(element).plus(this.create(element.offsetWidth, element.offsetHeight));
	},

	scrollOffset : function() {
		if (window.pageXOffset) {
			return this.create(window.pageXOffset, window.pageYOffset);
		} else if (document.documentElement) {
			return this.create(document.body.scrollLeft + document.documentElement.scrollLeft, document.body.scrollTop + document.documentElement.scrollTop);
		} else if (document.body.scrollLeft >= 0) {
			return this.create(document.body.scrollLeft, document.body.scrollTop);
		} else {
			return this.create(0, 0);
		}
	},

	clientSize : function() {
		if (window.innerHeight >= 0) {
			return this.create(window.innerWidth, window.innerHeight);
		} else if (document.documentElement) {
			return this.create(document.documentElement.clientWidth, document.documentElement.clientHeight);
		} else if (document.body.clientHeight >= 0) {
			return this.create(document.body.clientWidth, document.body.clientHeight);
		} else {
			return this.create(0, 0);
		}
	},

	mousePosition : function(event) {
		event = Hammer.events().fix(event);
		return this.create(event.clientX, event.clientY);
	},

	mouseOffset : function(event) {
		event = Hammer.events().fix(event);
		if (event.pageX >= 0 || event.pageX < 0) {
			return this.create(event.pageX, event.pageY);
		} else if (event.clientX >= 0 || event.clientX < 0) {
			return this.mousePosition(event).plus(this.scrollOffset());
		}
	},

	_size : function(element) {
		return this.create(element.offsetWidth, element.offsetHeight);
	},

	_offset : function(element) {
		return this.create(element.offsetLeft, element.offsetTop);
	}
}

function _HammerCoordinate(factory, x, y) {
	this.factory = factory;
	this.x = isNaN(x) ? 0 : x;
	this.y = isNaN(y) ? 0 : y;
}

_HammerCoordinate.prototype = {
	toString : function() {
		return "(" + this.x + "," + this.y + ")";
	},

	plus : function(that) {
		return this.factory.create(this.x + that.x, this.y + that.y);
	},

	minus : function(that) {
		return this.factory.create(this.x - that.x, this.y - that.y);
	},

	min : function(that) {
		return this.factory.create(Math.min(this.x, that.x), Math.min(this.y, that.y));
	},

	max : function(that) {
		return this.factory.create(Math.max(this.x, that.x), Math.max(this.y, that.y));
	},

	constrainTo : function (one, two) {
		var min = one.min(two)
		var max = one.max(two)

		return this.max(min).min(max)
	},

	distance : function(that) {
		return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2));
	},

	reposition : function(element) {
		element.style["top"] = this.y + "px";
		element.style["left"] = this.x + "px";
	}
}
/*
     FILE ARCHIVED ON 02:45:39 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:36 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
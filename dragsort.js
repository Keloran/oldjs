/**
 * @author Keloran
 */
Hammer._dragsortFactory = {
	makeSortable : function(item) {
		var group = Hammer.drag().createSimpleGroup(item);
		group.register('dragstart', this._onDragStart);
		group.register('dragmove', this._onDragMove);
		group.register('dragend', this._onDragEnd);
		return group;
	},

	makeListSortable : function(list) {
		var helpers = Hammer.helpers();
		var coordinates = Hammer.coordinates();
		var items = list.getElementsByTagName("li");

		helpers.map(items, function(item) {
			var dragGroup = dragsort.makeSortable(item);
			dragGroup.setThreshold(4);
			var min, max;
			dragGroup.addTransform(function(coordinate, dragEvent) { return coordinate.constrainTo(min, max); });
			dragGroup.register('dragstart', function() {
				var items = list.getElementsByTagName("li");
				min = max = coordinates.topLeftOffset(items[0]);
				for (var i = 1, n = items.length; i < n; i++) {
					var offset = coordinates.topLeftOffset(items[1]);
					min = min.min(offset);
					max = max.max(offset);
				}
			});
		});
		for (var i = 1, n = arguments.length; i < n; i++) { helpers.map(items, arguments[i]); }
	},

	_onDragStart : function(dragEvent) {
		//web-beta.archive.org/web/20070110024143/http://window.status = dragEvent.toString();
	},

	_onDragMove : function(dragEvent) {
		var helpers = Hammer.helpers();
		var coordinates = Hammer.coordinates();
		var item = dragEvent.group.element;
		var xmouse = dragEvent.transformedMouseOffset;
		var moveTo = null;

		var previous = helpers.previousItem(item, item.nodeName);
		while (previous != null) {
			var bottomRight = coordinates.bottomRightOffset(previous);
			if (xmouse.y <= bottomRight.y && xmouse.x <= bottomRight.x) { moveTo = previous; }
			previous = helpers.previousItem(previous, item.nodeName);
		}
		if (moveTo != null) {
			helpers.moveBefore(item, moveTo);
			return;
		}

		var next = helpers.nextItem(item, item.nodeName);
		while (next != null) {
			var topLeft = coordinates.topLeftOffset(next);
			if (topLeft.y <= xmouse.y && topLeft.x <= xmouse.x) { moveTo = next; }
			next = helpers.nextItem(next, item.nodeName);
		}
		if (moveTo != null) {
			helpers.moveBefore(item, helpers.nextItem(moveTo, item.nodeName));
			return;
		}
	},

	_onDragEnd : function(dragEvent) {
		Hammer.coordinates().create(0, 0).reposition(dragEvent.group.element);
	}
}
/*
     FILE ARCHIVED ON 02:41:43 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:35 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
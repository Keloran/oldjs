/*
	this helps the styling of DOM nodes
*/

var styling = new Object();

/*
	allows the element to have a certain opacity
*/
styling.opacity = function(ele,opacity) {
	ele.style.opacity=opacity;
	ele.style.mozOpacity=opacity;
	ele.style.filter="alpha(opacity="+(opacity*100)+")";
}

/*
	trys to bump the node up the tree
*/
styling.promote = function(ele) {
	var par=ele.parent;

	if (par) {
		var gpar=par.parent;

		if (gpar) {
			par.removeChild(ele);

			gpar.appendChild(ele);
		}
	}
}

/*
		remove all the chtrys to create the element as a DOM element if it isnt one already
*/
styling.toDOMElement = function(obj,wrapperType) {
	var result=null;
	var txtNode=document.createTextNode(""+obj);

	if (wrapperType) {
		var wrapper=document.createElement('div');

		wrapper.appendChild(txtNode);

		result=wrapper;
	} else {
		result=txtNode;
	}

	return result;
}

/*
	remove all the child nodes from a specified node
*/
styling.removeAllChildren = function(ele) {
	if (ele) {
		while (ele.firstChild) {
			ele.removeChild(ele.firstChild);
		}
	}
}

/*
	pushes a child up to the top of the node branch
*/
styling.insertAtTop = function(parent,child) {
	if (parent.firstChild) {
		parent.insertBefore(child,parent.firstChild);
	} else {
		parent.appendChild(child);
	}
}

styling.innerDOM = function(elem, newContent) {
	if (document.all) {
		elem.innerHTML = newContent;
	} else {
		var r = document.createRange();
		r.selectNodeContents(elem);
		r.deleteContents();
		var df = r.createContextualFragment(newContent);
		elem.appendChild(df);
	}
}

styling.outerDOM = function(elem, newContent) {
	var r = document.createRange();
	r.setStartBefore(elem);
	var df = r.createContextualFragment(newContent);
	elem.parentNode.replaceChild(df, elem);
}
/*
     FILE ARCHIVED ON 02:41:51 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:36 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
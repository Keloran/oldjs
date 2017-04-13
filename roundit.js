Hammer._roundFactory = {
	roundIt : function(elem, topLeft, topRight, bottomRight, bottomLeft) {
		if (typeof(bottomLeft) == "undefined") { bottomLeft = topLeft; }
		if (typeof(bottomRight) == "undefined") { bottomRight = topRight; }
		
		el = xGetElementById(elem);
		
		topColor = Hammer.css().readStyle(el, "background-color");
		backColor = Hammer.css().readStyle(el, "background-color");
		
		this.addCorner(el, backColor, topColor, topLeft, topRight, true);
		this.addCorner(el, backColor, topColor, bottomLeft, bottomRight, false);
	},
	
	blendColor : function(a, b, alpha) {
		var ca = Array(parseInt('0x' + a.substring(1, 3)), parseInt('0x' + a.substring(3, 5)), parseInt('0x' + a.substring(5, 7)));
		var cb = Array(parseInt('0x' + b.substring(1, 3)), parseInt('0x' + b.substring(3, 5)), parseInt('0x' + b.substring(5, 7)));
		
		return '#'  + ('0' + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16)).slice(-2).toString(16)
					+ ('0' + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16)).slice(-2).toString(16)
					+ ('0' + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16)).slice(-2).toString(16);
		
		return '#'  + ('0' + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16)).slice(-2).toString(16)
					+ ('0' + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16)).slice(-2).toString(16)
					+ ('0' + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16)).slice(-2).toString(16);
	},
	
	addCorner : function(el) {
		
	}
}

function round(elem, topLeft, topRight, bottomRight, bottomLeft){
	if (typeof(bottomLeft) == 'undefined') { bottomLeft = topLeft; }
	if (typeof(bottomRight) == 'undefined') { bottomRight = topRight; }
		
	el = xGetElementById(elem);

	topColor = get_current_style(el, "background-color", "transparent");
	backColor = get_current_style(el.parentNode, "background-color", "transparent");

	AddCorner(el, backColor, topColor, topLeft, topRight, true);
	AddCorner(el, backColor, topColor, bottomLeft, bottomRight, false);
}

function Blend(a, b, alpha){
	var ca = Array(
		parseInt('0x' + a.substring(1, 3)),
		parseInt('0x' + a.substring(3, 5)),
		parseInt('0x' + a.substring(5, 7))
	);

	var cb = Array(
		parseInt('0x' + b.substring(1, 3)),
		parseInt('0x' + b.substring(3, 5)),
		parseInt('0x' + b.substring(5, 7))
	);

	return '#'  + ('0' + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16)).slice(-2).toString(16)
				+ ('0' + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16)).slice(-2).toString(16)
				+ ('0' + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16)).slice(-2).toString(16);

	return '#'  + ('0' + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16)).slice(-2).toString(16)
				+ ('0' + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16)).slice(-2).toString(16)
				+ ('0' + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16)).slice(-2).toString(16);
}

function AddCorner(el, backColor, topColor, sizeX, sizeY, top) {
	if (!sizeX && !sizeY) { return }

	var i;
	var j;

	var d = document.createElement("div");
	d.style.backgroundColor = backColor;

	var lastarc = 0;

	for (i = 1; i < sizeY; i++) {
		var coverage, arc2, arc3;

		arc = Math.sqrt(1.0 - Math.sqr(1.0 - i / sizeY)) * sizeX;

		var n_bg = sizeX - Math.ceil(arc);
		var n_fg = Math.floor(lastarc);
		var n_aa = sizeX - n_bg - n_fg;
		var x = document.createElement("div");
		var y = d;

		x.style.margin = "0px " + n_bg + "px";
		x.style.height = '1px';
		x.style.overflow = 'hidden';

		for (j = 1; j <= n_aa; j++) {
			if (j == 1) {
				if (j == n_aa) {
					coverage = ((arc + lastarc) * .5) - n_fg;
				} else {
					arc2 = Math.sqrt(1.0 - Math.sqr((sizeX - n_bg - j + 1) / sizeX)) * sizeY;
					coverage = (arc2 - (sizeY - i)) * (arc - n_fg - n_aa + 1) * .5;
					coverage = 0;
				}
			} else if (j == n_aa) {
				arc2 = Math.sqrt(1.0 - Math.sqr((sizeX - n_bg - j + 1) / sizeX)) * sizeY;
				coverage = 1.0 - (1.0 - (arc2 - (sizeY - i))) * (1.0 - (lastarc - n_fg)) * .5;
			} else {
				arc3 = Math.sqrt(1.0 - Math.sqr((sizeX - n_bg - j) / sizeX)) * sizeY;
				arc2 = Math.sqrt(1.0 - Math.sqr((sizeX - n_bg - j + 1) / sizeX)) * sizeY;
			}

			x.style.backgroundColor = Blend(backColor, topColor, coverage);

			if(top) {
				y.appendChild(x);
			} else {
				y.insertBefore(x, y.firstChild);
			}

			y = x;

			var x= document.createElement("div");
			x.style.height = '1px';
			x.style.overflow = 'hidden';
			x.style.margin = "0px 1px";
		}

		x.style.backgroundColor = topColor;

		if (top) {
			y.appendChild(x);
		} else {
			y.insertBefore(x, y.firstChild);
		}

		lastarc = arc;
	}

	if (top) {
		el.insertBefore(d, el.firstChild);
	} else {
		el.appendChild(d);
	}
}

function get_current_style(element, property, not_accepted) {	
	var ee, i, val, apr;

	try{
		var cs = document.defaultView.getComputedStyle(element, '');
		val = cs.getPropertyValue(property);
	} catch(ee) {
		if (element.currentStyle) {
			apr = property.split("-");

			for (i=1;i<apr.length;i++) {
				apr[i] = apr[i].toUpperCase();
			}

			apr = apr.join("");
			val = element.currentStyle.getAttribute(apr);
		}
	}

	if ((val.indexOf("rgba") > -1 || val == not_accepted) && element.parentNode) {
		if(element.parentNode != document) {
			val = get_current_style(element.parentNode, property, not_accepted);
		} else {
			val = '#FFFFFF';
		}
	}

	if (val.indexOf("rgb") > -1 && val.indexOf("rgba") == -1) {
		val = rgb2hex(val);
	}
	
	if (val.lenght == 4) {
		val = '#' + val.substring(1, 1) + val.substring(1, 1) + val.substring(2, 1) + val.substring(2, 1) + val.substring(3, 1) + val.substring(3, 1);
	}

	return val;
}

function rgb2hex(value){
	var x = 255;
	var hex = '';
	var i;
	var regexp = /([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
	var array = regexp.exec(value);

	for (i=1;i<4;i++) {
		hex += ('0' + parseInt(array[i]).toString(16)).slice(-2);
	}

	return '#'+hex;
}
/*
     FILE ARCHIVED ON 02:46:31 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:36 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
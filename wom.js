function womOn() {
	window.onload = womGo;
}

function womGo() {
	for(var i = 0, n = woms.length; i < n; i++) {
		eval(woms[i]);
	}
}

function womAdd(func) {
	woms[woms.length] = func;
}

var woms = new Array();
/*
     FILE ARCHIVED ON 02:39:34 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:36 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
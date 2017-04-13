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
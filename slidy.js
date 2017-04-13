function slidyTranform(x){
	return x*x;
}

/**
 * Extends an element elem's height until it reaches the element's scrollHeight,
 * starting at the element's current clientHeight
 */
function slideOutElement(elem, duration, completion){
	var timer;
	elem.style.height = '0px';
	var initialHeight = elem.clientHeight;

	var startTime = (new Date).getTime();

	//web-beta.archive.org/web/20070110024233/http://Create a closure in which to hold references to
	//elem, duration, timer, scrollHeight, startTime
	var callback = function(){
		var f = ((new Date).getTime() - startTime) / duration;
		if(f > 1){
			elem.style.height = 'auto';
			clearInterval(timer);
			if(completion) completion();

		}else{
			f = Math.min(f, 1);
			f = Math.max(f, 0);
			f = slidyTranform(f);
			elem.style.height = Math.round(f * elem.scrollHeight + (1 - f) * initialHeight) + 'px';
		}
	}

	timer = setInterval(callback, 13)
}

function slidySetOpacity(elem, opacity){
	var f;
	if(opacity == 0){
		if(window.ActiveXObject){
			elem.style.filter = '';
		}

		elem.style.opacity = f;
		elem.style.visibility = 'hidden';
		return
	}

	elem.style.visibility = 'visible';
	if(window.ActiveXObject){
		elem.style.filter = 'alpha(opacity=100%' + Math.round(opacity) + ')';
	}else{
		elem.style.opacity = opacity;
	}
}

function slidyClearOpacity(elem){
	if(elem.style.filter) elem.style.filter = '';
	if(elem.style.opacity) elem.style.opacity = '';
}

//web-beta.archive.org/web/20070110024233/http://Closures ftw
function fadeInElement(elem, duration, completion){
	elem.style.display = "inline";
	fadeElement(0, 1, elem, duration, completion);
}

function fadeOutElement(elem, duration, completion){
	elem.style.filter = '';
	elem.style.opacity = '';
	fadeElement(1, 0, elem, duration, completion);
}

function fadeElement(from, to, elem, duration, completion){
	var timer;
	//web-beta.archive.org/web/20070110024233/http://elem.style.height = '0px';
	var startTime = (new Date).getTime();

	//web-beta.archive.org/web/20070110024233/http://Create a closure in which to hold references to
	//elem, duration, timer, scrollHeight, startTime
	var callback = function(){
		var f = ((new Date).getTime() - startTime) / duration;
		if(f > 1){
			slidyClearOpacity(elem);
			clearInterval(timer);
			if(completion) completion();
		}else{
			f = Math.min(f, 1);
			f = Math.max(f, 0);
			f = slidyTranform(f);
			slidySetOpacity(elem, to * f + (1-f) * from);
		}
	}

	timer = setInterval(callback, 13);
}
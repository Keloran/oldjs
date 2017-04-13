var contextMenuObj;
var activeContextMenuItem = false;
var MSIE = navigator.userAgent.indexOf("MSIE") ? true : false;

/**
 * Turns the hightlight class on
 */
function highLightOn() {
	this.className = " contextMenuHighlighted";
}

/**
 * Turns the highlight class off
 * and turns it back to normal
 */
function highLightOff() {
	this.className = "";
}

/**
 * Shows the context menu for the element selected
 * @param {Object} e
 */
function showContextMenu(e) {
	if (activeContextMenuItem) { activeContextMenuItem.className = ""; }
	if (document.all) { e = event; }
	
	var xPos = e.clientX;
	var yPos = e.clientY;
	contextMenuObj.style.display = "block";
	
	if (xPos + contextMenuObj.offsetWidth > (document.documentElement.offsetWidth - 20)) { xPos = xPos + (document.documentElement.offsetWidth - (xPos + contextMenuObj.offsetWidth)) - 20; }
	if (yPos + contextMenuObj.offsetHeight > (document.documentElement.offsetHeight - 20)) { yPos = yPos + (document.documentElement.clientHeight - (yPos + contextMenuObj.offsetHeight)) - 20; }
	
	contextMenuObj.style.left = xPos + "px";
	contextMenuObj.style.top = yPos + "px";
	
	return false;
}

/*
 * Hides the context menu for the element
 */
function hideContextMenu(e) {
	if (document.all) { e = event; }
	if (e.button == 0 && !MSIE) { } else { contextMenuObj.style.display = "none"; }
}

/**
 * Initalizes the context menu when context menu button
 * (right click) is pressed
 */
function initContextMenu(elem) {
	contextMenuObj = xGetElementById("contextMenu");	
	contextMenuObj.style.display = "block";
	
	var menuItems = contextMenuObj.getElementsByTagName("li");
	for (i = 0; i < menuItems.length; i++) {
		menuItems[i].onmouseover = highLightOn;
		menuItems[i].onmouseout = highLightOff;
		
		var aTag	= menuItems[i].getElementsByTagName("a")[0];
		var img		= menuItems[i].getElementsByTagName("img")[0];
		
		if (img) {
			var imgDiv				= document.createElement("div")
				imgDiv.className	= "imageBox";
				imgDiv.appendChild(img);
				
			var txtDiv				= document.createElement("div");
				txtDiv.className	= "itemTxt";
				txtDiv.innerHTML	= aTag.innerHTML;
				
			aTag.innerHTML = "";
			aTag.appendChild(imgDiv);
			aTag.appendChild(txtDiv);
		} else {
			if (MSIE) {
				aTag.style.paddingLeft = "15px";
				aTag.style.width = (aTag.offsetWidth - 30) + "px";
			} else {
				aTag.style.paddingleft = "30px";
				aTag.style.width = (aTag.offsetWidth - 60) + "px";
			}
		}
	}
	
	contextMenuObj.style.display = "none";
	
	if (elem) {
		xGetElementById(elem).oncontextmenu = showContextMenu;
	} else {
		document.documentElement.oncontextmenu = showContextMenu;
	}
	
	document.documentElement.onclick = hideContextMenu;
}
/*
     FILE ARCHIVED ON 02:40:24 Jan 10, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:37 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
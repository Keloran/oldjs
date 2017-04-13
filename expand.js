/**
 * @author Keloran
 */
var COLLAPSABLE_PARENT_NAME	= "collapsable";
var COLLAPSABLE_PARENT_TYPE = "li";
var COLLAPSABLE_CHILD_TYPE	= "p";

var CONTAINER_PARENT_TYPE	= "div";
var CONTAINER_PARENT_NAME	= "feedButtons";

var COLLAPSABLE_EXPAND = "[+]";
var COLLAPSABLE_SHRINK = "[-]";

initExpand = function() {
    if (document.getElementById && document.createTextNode) {
        var entries = document.getElementsByTagName(COLLAPSABLE_PARENT_TYPE);
        for(i = 0; i < entries.length; i++) {
			if (entries[i].className == COLLAPSABLE_PARENT_NAME) {
				if (entries[i].id == "list1") {
               		assignCollapse(entries[i]);
				} else {
					assignExpand(entries[i]);
				}
			}
		}
    }
}

assignCollapse = function (div) {
    var colButton = document.createElement('a');
    colButton.setAttribute('expand', COLLAPSABLE_EXPAND);
    colButton.setAttribute('shrink', COLLAPSABLE_SHRINK);
    colButton.setAttribute('state', 1);
	colButton.innerHTML = "";
	colButton.className = "expand";
    div.insertBefore(colButton, div.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0]);

    colButton.onclick = function() {
        var state = -(1 / this.getAttribute('state'));
        this.setAttribute('state', state);
        this.parentNode.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0].style.display = state == -1 ? 'block' : 'none';
        this.parentNode.className = state == -1 ? 'collapsable' : 'collapsed';
        this.innerHTML = this.getAttribute(state == -1 ? 'shrink' : 'expand');
        this.title = state == -1 ? 'Shrink' : 'Expand';
    };
    colButton.onclick();
}

assignExpand = function (div) {
	var expButton = document.createElement("a");
	expButton.setAttribute('shrink', COLLAPSABLE_SHRINK);
	expButton.setAttribute('expand', COLLAPSABLE_EXPAND);
	expButton.setAttribute('state', -1);
	expButton.innerHTML = "";
	expButton.className = "expand";
	div.insertBefore(expButton, div.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0]);
	
	expButton.onclick = function() {
		var state = -(1 * this.getAttribute('state'));
		this.setAttribute('state', state);
		this.parentNode.getElementsByTagName(COLLAPSABLE_CHILD_TYPE)[0].style.display = state == 1 ? 'none' : 'block';
		this.innerHTML = this.getAttribute(state == 1 ? 'expand' : 'shrink');
		this.title = state == 1 ? 'Expand' : 'Shrink';
		};
	expButton.onclick();
}
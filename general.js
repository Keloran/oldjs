//web-beta.archive.org/web/20070110024305/http://So that it doesn't throw exceptions when firebug is not installed!
if(window && !window.console) {
	window.console = {
		log: function() {},
		info: function() {},
		debug: function() {},
		warn: function() {},
		error: function() {},
		trace: function() {},
		time: function(functionName) {},
		timeEnd: function(functionName) {},
		count: function(functionName) {}
	}
}

function replaceLink(elem, toggle, fadeType, fadetime, slidetime) {
	var slidetime = (slidetime) ? slidetime : 800;
	var fadetime = (fadetime) ? fadetime : 150;
	var fadeType = (fadeType) ? fadeType : "fadeOut";

	var elem = xGetElementById(elem);
	var toggle = xGetElementById(toggle);

	if (fadeType == "in") {
		fadeInElement(elem, fadetime);
	} else {
		slideOutElement(elem, slidetime);
		fadeOutElement(toggle, fadetime);
	}

	toggle.innerText = "";
	toggle.style.display = "none";
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			} else if (dataProp) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) {
			return;
		}
		
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{	// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 	// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function unHide(typeId, page){
	if(typeof(userId) != "undefined") {
		cParams = "action=unhide";
		cParams += "&userid=" + userId;
		cParams += "&typeid=" + typeId;
		cParams += "&page=" + page;

		new net.ContentLoader("libs/ajax.php", buildUnHide, null, cParams);
	} else {
		return false;
	}
}

function createSpinny(elemId, imgType){
	if (typeof(imgType) == "undefined") { 
		imgType = ""; 
	}
	
	var docRoot = xGetElementById(elemId);
	var spinny = document.createElement("img");
	var spinnybr = document.createElement("br");
	spinnybr.id = docRoot.id + "spinnybr";
	spinny.className = "spinny";
	spinny.id = docRoot.id + "spinny";
	spinny.src = "images/loader" + imgType + ".gif";
	
	if (imgType == "large") {
		spinny.style.width = "100px";
		spinny.style.height = "100px";
		spinny.style.zIndex = "101";
		spinny.style.position = "absolute";
		spinny.style.top = "20%";
		spinny.style.left = "50%";
	} else if (imgType == "tiny") {
		spinny.style.width = "16px";
		spinny.style.height = "16px";
	}

	docRoot.appendChild(spinnybr);
	docRoot.appendChild(spinny);
}

function destroySpinny(elemId){
	var docRoot = xGetElementById(elemId);
	var spinny = xGetElementById(docRoot.id + "spinny");
	var spinnybr = xGetElementById(docRoot.id + "spinnybr");

	if (typeof(spinnybr) != "undefined" || typeof(spinnybr) != null) { 
		docRoot.removeChild(spinnybr); 
	}
	if (typeof(spinny) != "undefined" || typeof(spinny) != null) { 
		docRoot.removeChild(spinny); 
	}
}

Math.sqr = function(x) {
	return x*x;
}

function throwError(elem, xmlDoc) {
	cont = xGetElementById(elem);	
	errorTitle = document.createElement("h1");
	titleText = document.createTextNode("A problem has happened");
	errorTitle.appendChild(titleText);
	
	styling.removeAllChildren(cont);
	
	desc = document.createElement("div");
	descText1 = document.createTextNode("This could be due to a problem with Conv");
	descBr1 = document.createElement("br");
	descText2 = document.createTextNode("or it could be due to a problem with the item itself");
	descBr2 = document.createElement("br");
	
	desc.appendChild(descText1);
	desc.appendChild(descBr1);
	desc.appendChild(descText2);
	desc.appendChild(descBr2);
	desc.appendChild(xmlDoc);
	cont.appendChild(errorTitle);
	cont.appendChild(desc);
}
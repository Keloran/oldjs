/**
 * @author Keloran
 */
function getFeeds() {
	cParams = "action=getFeeds";
	cParams += "&userid=" + userId;

	new net.ContentLoader("libs/ajax.php", listFeeds, null, cParams);
}

function listFeeds() {
	var xmlDoc = this.req.responseXML.documentElement;
	var feeds = xmlDoc.getElementsByTagName("feedId")
	var feedList = xGetElementById("feedList");

	for (i = 0; i < feeds.length; i++) {
		feedId = feeds[i].firstChild.nodeValue;

		cParams = "action=getArticles";
		cParams += "&userid=" + userId;
		cParams += "&feedid=" + feedId;

		createSpinny("articles" + feedId);
		new net.ContentLoader("libs/ajax.php", listArticles, null, cParams);
	}
}

function listArticles() {
	var xmlDoc = this.req.responseXML.documentElement;

	if (typeof(xmlDoc.getElementsByTagName('feedId')[0]) != "undefined") {
		var feedId = xmlDoc.getElementsByTagName("feedId")[0].firstChild.nodeValue;
		var refreshTime = xmlDoc.getElementsByTagName("refresh")[0].firstChild.nodeValue;
		var items = xmlDoc.getElementsByTagName("item");
		var feedBox = xGetElementById("articles" + feedId);

		var feedTitle 				= xGetElementById("feedTitle" + feedId);
		var feedButtons 			= xGetElementById("buttons" + feedId);

		for (i = 0; i < items.length; i++) {
			if (items[i].getElementsByTagName('articleId').length > 0) {
				itemTitle 	= items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
				itemId 		= items[i].getElementsByTagName('articleId')[0].firstChild.nodeValue;
				itemURL 	= items[i].getElementsByTagName('articleURL')[0].firstChild.nodeValue;

				itemTitleLink				= document.createElement("a");
				itemTitleLink.onclick		= showDescription;
				itemTitleLink.oncontextmenu	= showContext;
				itemTitleLink.name			= itemURL;
				itemTitleLink.href			= "#";
				itemTitleLink.className 	= "itemTitle";
				itemTitleLink.id			= itemId;
				itemTitleText				= document.createTextNode(itemTitle);
				itemBr						= document.createElement("br");

				itemTitleLink.appendChild(itemTitleText);
				itemTitleLink.appendChild(itemBr);
				feedBox.appendChild(itemTitleLink);
			}
		}
		setTimeout("getArticles(" + feedId + ")", refreshTime);
	} else {
		throwError("reader", xmlDoc);
		setTimeout("forceUpdate(" + feedId + ")", 300000);
	}
	destroySpinny("articles" + feedId);
}

function showContext(e) {
	if(navigator.appName == "Netscape") {
		eventSrcName 	= (e.target) ? e.target.name : 'undefined';
		eventSrcId		= (e.target) ? e.target.id : 'undefined';
	} else {
		eventSrcName 	= (event.srcElement) ? event.srcElement.name :	'undefined';
		eventSrcId		= (event.srcElement) ? event.srcElement.id : 'undefined';
	}

	var contextHost		= xGetElementById("reader");
	if (typeof(eventSrcName) != "undefined") {
		var contextURL	= eventSrcName;
	} else {
		var contextURL	= eventSrcId;
	}

	if (xGetElementById("contextMenu")) {
		contextOL	= xGetElementById("contextMenu");
		styling.removeAllChildren(contextOL);
	} else {
		var contextOL 		= document.createElement("ul");
			contextOL.id	= "contextMenu";
	}

	var contextLI			= document.createElement("li");
	var contextA			= document.createElement("a");
		contextA.href		= "#";
		contextA.id			= contextURL;
		contextA.onclick	= gotLink;

	var contextText		= document.createTextNode("Goto Article");
	var contextImg		= document.createElement("img");
		contextImg.src	= "images/feed.png";

	contextHost.appendChild(contextOL);
	contextOL.appendChild(contextLI);
	contextLI.appendChild(contextA);
	contextA.appendChild(contextText);
	initContextMenu(eventSrcId);
}

function getArticles(feedId) {
	cParams = "action=getArticles";
	cParams += "&userid=" + userId;
	cParams += "&feedid=" + feedId;

	createSpinny("articles" + feedId);
	new net.ContentLoader("libs/ajax.php", listNewArticles, null, cParams);
}

function forceUpdate(feedId, direction) {
	clearArticles = xGetElementById("articles" + feedId);
	styling.removeAllChildren(clearArticles);

	cParams = "action=getArticles";
	cParams += "&userid=" + userId;
	cParams += "&feedid=" + feedId;
	cParams += "&dir=" + direction;

	createSpinny("articles" + feedId);
	new net.ContentLoader("libs/ajax.php", listNewArticles, null, cParams);
}

function listNewArticles(){
	var xmlDoc = this.req.responseXML.documentElement;

	if (typeof(xmlDoc.getElementsByTagName('feedId')[0]) != "undefined") {
		var feedId = xmlDoc.getElementsByTagName("feedId")[0].firstChild.nodeValue;
		var refreshTime = xmlDoc.getElementsByTagName("refresh")[0].firstChild.nodeValue;
		var items = xmlDoc.getElementsByTagName("item");
		var feedBox = xGetElementById("articles" + feedId);

		for (i = 0; i < items.length; i++) {
			itemTitle = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
			itemId = items[i].getElementsByTagName('articleId')[0].firstChild.nodeValue;
			links = feedBox.getElementsByTagName("a");

			itemTitleLink			= document.createElement("a");
			itemTitleLink.onclick	= showDescription;
			itemTitleLink.href		= "#";
			itemTitleLink.className = "itemTitle";
			itemTitleLink.id		= itemId;
			itemTitleText			= document.createTextNode(itemTitle);
			itemBr					= document.createElement("br");
			checkId					= xGetElementById(itemId);
			newId					= xGetElementById(itemTitleLink);

			feedBox.appendChild(itemTitleLink);
			itemTitleLink.appendChild(itemTitleText);
			itemTitleLink.appendChild(itemBr);
		}

		if (typeof(feedId) != "undefined" || typeof(feedId) != "null") { 
			destroySpinny("articles" + feedId); 
		}
		if (feedBox.childNodes.length > 5) { 
			for (iC = 0; iC < 5; iC++) { 
				feedBox.removeChild(feedBox.firstChild); 
			} 
		}

		setTimeout("getArticles(" + feedId + ")", refreshTime);
	} else {
		throwError("reader", xmlDoc);
	}
}

function showDescription(e) {
	if(navigator.appName == "Netscape") {
		eventSrcId = (e.target) ? e.target.id : 'undefined';
	} else {
		eventSrcId = (event.srcElement) ? event.srcElement.id :	'undefined';
	}

	cParams = "action=getDescription";
	cParams += "&articleid=" + eventSrcId;

	createSpinny("reader", "large");
	new net.ContentLoader("libs/ajax.php", getDescription, null, cParams);
}

function gotLink(e) {
	if(navigator.appName == "Netscape") {
		eventSrcId = (e.target) ? e.target.id : 'undefined';
	} else {
		eventSrcId = (event.srcElement) ? event.srcElement.id :	'undefined';
	}

	window.open(eventSrcId);
}

function getDescription() {
	styling.removeAllChildren(xGetElementById("reader"));
	createSpinny("reader");

	var cont = xGetElementById("reader");
	var xmlDoc = this.req.responseXML.documentElement;

	if (typeof(xmlDoc.getElementsByTagName('title')[0]) != "undefined") {
		var articleTitle = xmlDoc.getElementsByTagName('title')[0].firstChild.nodeValue;
		var desc = xmlDoc.getElementsByTagName('description')[0].firstChild.nodeValue;
		var articleLink = xmlDoc.getElementsByTagName('link')[0].firstChild.nodeValue;
		var articleId = xmlDoc.getElementsByTagName('articleid')[0].firstChild.nodeValue;
		var duggLink = xmlDoc.getElementsByTagName('dugglink')[0].firstChild.nodeValue;

		var pubDate = "Article Dated : ";
			pubDate += xmlDoc.getElementsByTagName('pubdate')[0].firstChild.nodeValue;

		var hr = document.createElement("hr");
		var br = document.createElement("br");

		var contextMenu		= document.createElement("ul");
			contextMenu.id	= "contextMenu";

		if (userId) {
			var bookMark			= document.createElement("a");
				bookMark.id			= "bookMark" + articleId;
				bookMark.className	= "articleLink";
				bookMark.onclick	= bookmark;
				bookMarkText		= document.createTextNode("Bookmark");
		}

		var directLink				= document.createElement("a");
			directLink.id			= articleLink;
			directLink.className	= "articleLink";
			directLink.href			= "#";
			directLink.onclick		= gotLink;
			directLinkText			= document.createTextNode("Goto Article");
			directBr				= document.createElement("br");
			directLink.appendChild(directLinkText);

		if (duggLink != "undugg") {
			var diggLink			= document.createElement("a");
				diggLink.id			= duggLink;
				diggLink.href		= "#";
				diggLink.onclick	= gotLink;
				diggLink.className	= "articleLink";
				diggLinkText		= document.createTextNode("Goto DuggMirror");
				diggBr				= document.createElement("br");
				diggLink.appendChild(diggLinkText);
		} else {
			var diggLink 		= document.createElement("div");
				diggLinkText 	= document.createTextNode("");
				diggBr			= document.createElement("br");
				diggLink.appendChild(diggLinkText);
		}

		showTitle = document.createElement("h2");
		showTitleText = document.createTextNode(articleTitle);
		showPubDate = document.createTextNode(pubDate);
		showContent = document.createElement("div");
		showContent.id = articleId;

		styling.removeAllChildren(cont);
		styling.innerDOM(showContent, desc);

		cont.appendChild(showTitle);
		showTitle.appendChild(showTitleText);
		cont.appendChild(showContent);
		showContent.appendChild(hr);

		showContent.appendChild(directLink);
		showContent.appendChild(directBr);

		cont.oncontextmenu = showContext;
		cont.name = articleLink;

		if (diggLink.childNodes.firstChild != "") {
			showContent.appendChild(diggLink);
			showContent.appendChild(diggBr);
			cont.name += "|" + duggLink;
		}

		if (userId) {
			showContent.appendChild(bookMark);
			bookMark.appendChild(bookMarkText);
		}
	} else {
		destroySpinny("reader");
		throwError("reader", xmlDoc);
	}
}

function showAll(feedId) {
	cParams = "action=getAll";
	cParams += "&feedid=" + feedId;

	createSpinny("reader", "large");
	new net.ContentLoader("libs/ajax.php", getAll, null, cParams);
}

function getAll() {
	var cont = xGetElementById("reader");
	var xmlDoc = this.req.responseXML.documentElement;
	var items = xmlDoc.getElementsByTagName("result");
	var feedTitle = xmlDoc.getElementsByTagName("feedTitle")[0].firstChild.nodeValue;

	if (typeof(xmlDoc.getElementsByTagName('result')[0]) != "undefined") {
		var showCont	= document.createElement("div");
		var ol			  = document.createElement("ol");
		var titleH 		= document.createElement("h2");
		var titleText	= document.createTextNode(feedTitle);


		for(i = 0; i < items.length; i++) {
			articleTitle = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
			articleId = items[i].getElementsByTagName('articleid')[0].firstChild.nodeValue;
			articleLink = items[i].getElementsByTagName('url')[0].firstChild.nodeValue;

			li = document.createElement("li");

			liTitle					= document.createElement("a");
			liTitle.id				= articleId;
			liTitle.onclick 		= showDescription;
			liTitle.name			= articleLink;
			liTitle.oncontextmenu	= showContext;
			liTitle.href			= "#";
			liTitleText				= document.createTextNode(articleTitle);

			liTitle.appendChild(liTitleText);
			li.appendChild(liTitle);
			ol.appendChild(li);
		}

		destroySpinny("reader");
		styling.removeAllChildren(cont);
		cont.appendChild(titleH);
		titleH.appendChild(titleText);
		showCont.appendChild(ol);
		cont.appendChild(showCont);
	} else {
		destroySpinny("reader");
		throwError("reader", xmlDoc);
	}
}
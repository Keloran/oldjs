var dragsort 	= Hammer.dragsort();
var junkpile 	= Hammer.junkpile();
var css 		= Hammer.css();
var evnt		= Hammer.events();

womAdd('getFeeds()');
womAdd('roundNews()');

function verticalOnly(item) {
	item.HammerDragGroup.verticalOnly();
}

function horizontalOnly(item) {
	item.HammerDragGroup.horizontalOnly();
}

function saveFeedOrder(item) {
	var group = item.HammerDragGroup;
	var list = group.element.parentNode;
	var id = list.getAttribute("id");
	if (id == null) { return; }
	group.register('dragend', function() { 
		Hammer.cookies().set("feed-" + id, junkpile.serializeList(list), 365) 
	});
}

function saveMenuOrder(item) {
	var group = item.HammerDragGroup;
	var list = group.element.parentNode;
	var id = list.getAttribute("id");
	if (id == null) { return; }
	group.register('dragend', function() { 
		Hammer.cookies().set("menu-" + id, junkpile.serializeList(list), 365) 
	});
}

function roundNews(){
	newsItems = document.getElementsByTagName("h3");

	for(i = 0; i < newsItems.length; i++) {
		newsId = "news" + newsItems[i].id.substring(1);
		round(newsId, 5, 5);
	}
}

function clearSearch(){
	searchClear = xGetElementById('searchText');
	searchClear.value = "";
}

womAdd('round("siteHeader", 0, 0, 5, 5)');
womAdd('round("siteMenu", 5, 5)');
womAdd('round("siteList", 5, 5)');
womAdd('round("siteContent", 5, 5)');
womAdd('round("siteFooter",  5, 5)');
womAdd('round("googleSearch", 5, 5)');

womAdd('junkpile.restoreListOrder("feedList")');
womAdd('dragsort.makeListSortable(xGetElementById("feedList"), verticalOnly, saveFeedOrder)');
womAdd('junkpile.restoreListOrder("menuList")');
womAdd('dragsort.makeListSortable(xGetElementById("siteMenu"), horizontalOnly, saveMenuOrder)');
womAdd('initExpand()');
womAdd('clearSearch()');

womOn();
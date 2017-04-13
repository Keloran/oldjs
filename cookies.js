/**
 * @author Keloran
 */
Hammer._cookiesFactory = {
	set : function(name, value, expire) {
		if (expire) {
			var date = new Date();
			date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	},

	get : function(name) {
		var namePattern = name + "=";
		var cookies = document.cookie.split(';');
		for (var i = 0, n = cookies.length; i < n; i++) {
			var c = cookies[i];
			while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
			if (c.indexOf(namePattern) == 0) { return c.substring(namePattern.length, c.length); }
		}
		return null;
	},

	eraseCookie : function(name) {
		createCookie(name, "", -1);
	}
}
/*
     FILE ARCHIVED ON 22:34:09 Jan 03, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:36:35 Apr 13, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
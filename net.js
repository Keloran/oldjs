/*
url-loading object and a request queue built on top of it
*/

/* namespacing object */
var net = new Object();

net.READY_STATE_UNINITIALIZED = 0;
net.READY_STATE_LOADING = 1;
net.READY_STATE_LOADED = 2;
net.READY_STATE_INTERACTIVE = 3;
net.READY_STATE_COMPLETE = 4;


/*--- content loader object for cross-browser requests ---*/
net.ContentLoader = function(url, onload, onerror, params, method, contentType) {
  this.req = null;
  net.currentLoader = this;
  this.onload = onload;
  this.onerror = (onerror) ? onerror : this.defaultError;
  this.method = (method) ? method : "POST";
  this.loadXMLDoc(url, params, contentType);
}

net.ContentLoader.prototype.loadXMLDoc = function(url, params, contentType) {
  if (!contentType && this.method == "POST") { 
    contentType = 'application/x-www-form-urlencoded'; 
  }
	
  if (window.XMLHttpRequest) {
    this.req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      this.req = new ActiveXObject("MSXML2.XMLHTTP");
    } catch (err) {
      this.req = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
	
  if (this.req) {
    try {
      var loader = this;

      if(typeof(net) != "undefined") {
        this.req.onreadystatechange = function() { 
          net.ContentLoader.onReadyState.call(loader); 
        }
      }

      this.req.open(this.method, url, true);
      if (contentType) { 
        this.req.setRequestHeader('Content-Type', contentType); 
      }
      this.req.send(params);
    } catch (err) {
      this.onerror.call(this);
    }
  }
}


net.ContentLoader.onReadyState = function() {
    var req = this.req;
    var ready = req.readyState;
    if (ready == net.READY_STATE_COMPLETE) {
        var httpStatus = req.status;
        if (httpStatus == 200 || httpStatus == 0) {
            this.onload.call(this);
        } else {
            this.onerror.call(this);
        }
    }
}

net.ContentLoader.prototype.defaultError = function() {
	alert("error fetching data!"
            + "\n\nreadyState:" + this.req.readyState
            + "\nstatus: " + this.req.status
            + "\nheaders: " + this.req.getAllResponseHeaders());
}
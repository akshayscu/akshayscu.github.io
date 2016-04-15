(function(){
	"use strict";

	//Event handler to grab the access token and set it to thee session storage
	var loadEventHandler = function(){
			// First, parse the query string
			var params = {}, queryString = location.hash.substring(1),
			    regex = /([^&=]+)=([^&]*)/g, m;
			while (m = regex.exec(queryString)) {
			  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}
		 	sessionStorage.access_token = params["access_token"];					
	};
	loadEventHandler();
})();
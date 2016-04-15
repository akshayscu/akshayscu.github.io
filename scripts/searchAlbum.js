(function(){
	'use strict';

	var audioObject = null;	

	var jsonToQueryString = function(json) {
		if(json !== null){
		    return '?' + 
		        Object.keys(json).map(function(key) {
		            return encodeURIComponent(key) + '=' +
		                encodeURIComponent(json[key]);
		        }).join('&');
		}
		return "";
	};

	var makeRestCall = function(method, url, data, success, failure){
		
		var xmlhttp = new XMLHttpRequest();
		
		if(method === "GET"){
			//serialize query data
			url += jsonToQueryString(data);
		}

		xmlhttp.open(method, url);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200){
					success(JSON.parse(xmlhttp.responseText));
				}
				else{
					failure(xmlhttp.responseText);
				}	
			}	
		};	
		if(method === "GET"){
			xmlhttp.send(null);
		}else{
				xmlhttp.send(JSON.stringify(data));
		}

	};

	var getTemplateHtml = function(imgUrl, albumId){
		var templateNode = document.createElement("div");

		var styleAttribute = document.createAttribute("style");
		var idAttribute = document.createAttribute("id");
		var classAttribute = document.createAttribute("class");

		styleAttribute.value = "background-image:url("+ imgUrl +")";
		idAttribute.value = albumId;
		classAttribute.value = "cover";

		templateNode.setAttributeNode(styleAttribute);
		templateNode.setAttributeNode(idAttribute);
		templateNode.setAttributeNode(classAttribute);
		return templateNode;
	};
	

	var searchAlbums = function(query){
		var data = {
			"query": query,
			"type":"album"
		};

		var successCallback = function(response){
			var resultsNode = document.getElementById('results');
			resultsNode.innerHTML = "";
			for(var i=0;i<response.albums.items.length;i++){
				resultsNode.appendChild(getTemplateHtml(response.albums.items[i].images[0].url, response.albums.items[i].id))
			}
		};


		var failureCallback = function(response){
			console.log(response);
		};

		makeRestCall("GET", "https://api.spotify.com/v1/search", data, successCallback, failureCallback);
	};


	var fetchTracks = function (albumId, callback) {
	    makeRestCall("GET", "https://api.spotify.com/v1/albums/" + albumId, null, callback);
	};


	var handleAlbumSearchRequest = function (e) {
		    searchAlbums(document.getElementById('query').value);
	};

	var handleKeyUpEventForSearch = function(e) {
		e.preventDefault();
		var code = e.keyCode;
		if(code == 13){			
			handleAlbumSearchRequest();
		}
	} ;

	var handleResultsClick = function (e) {
	    var target = e.target;
	    if (target !== null && target.classList.contains('cover')) {
	        if (target.classList.contains('playing')) {
	            audioObject.pause();
	        } else {
	            if (audioObject) {
	                audioObject.pause();
	            }
	            fetchTracks(target.getAttribute('id'), function (data) {
	                audioObject = new Audio(data.tracks.items[0].preview_url);
	                audioObject.play();
	                target.classList.add('playing');
	                audioObject.addEventListener('ended', function () {
	                    target.classList.remove('playing');
	                });
	                audioObject.addEventListener('pause', function () {
	                    target.classList.remove('playing');
	                });
	            });
	        }
	    }
	};

var windowOnload = function(){
	document.getElementById('search').addEventListener('click', handleAlbumSearchRequest);
	document.getElementById('query').addEventListener('keyup', handleKeyUpEventForSearch);
	document.getElementById('results').addEventListener('click', handleResultsClick);
};

window.onload = windowOnload;
})();



(function(){

	var tasksResourceBaseUrl = "https://www.googleapis.com/tasks/v1";

	var makeRestCall = function(method, url, data, success, failure){

		url = tasksResourceBaseUrl + url;
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open(method, url);
		
		//set request header for POST or PUT
		if(method === "POST" || method === "PUT"){
			xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");		
		}	

		xmlhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.access_token);

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200){
					success(JSON.parse(xmlhttp.responseText));
				}
				else if(xmlhttp.status == 204){
					success();
				}	
				else{
					failure(xmlhttp.responseText);
				}	
			}	
		};	

		if(method === "GET" || method === "DELETE"){
			xmlhttp.send(null);
		}else{
			xmlhttp.send(JSON.stringify(data));
		}
	};

	var restApiClient = function(){

		var client = {};

		client.getResource = function(url, success, failure){
			makeRestCall("GET", url, null, success, failure);
		};

		client.postResource = function(url, data, success, failure){
			makeRestCall("POST", url, data, success, failure);
		};

		client.updateResource = function(url, data, success, failure){
			makeRestCall("PUT", url, data, success, failure);	
		};

		client.deleteResource = function(url, success, failure){
			makeRestCall("DELETE", url, null, success, failure);
		};

		return client;
	};

	todoApp.apiClient = restApiClient();
})();
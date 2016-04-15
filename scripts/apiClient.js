(function(){

	var tasksResourceBaseUrl = "https://www.googleapis.com/tasks/v1";

	var makeRestCall = function(method, url, data, success, failure){

		url = tasksResourceBaseUrl + url;
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open(method, url);
		
		//set request header for POST
		if(method === "POST"){
			xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");		
		}	

		xmlhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.access_token);

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

	var restApiClient = function(){

		var client = {};

		client.getResource = function(url, success, failure){
			makeRestCall("GET", url, null, success, failure);
		};

		client.postResource = function(url, data, success, failure){
			makeRestCall("GET", url, data, success, failure);
		};

		return client;
	};

	todoApp.apiClient = restApiClient();
})();
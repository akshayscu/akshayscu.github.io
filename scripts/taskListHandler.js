(function(){

	var getTasksList = function(callback){
		
		var success = function(data){
			//console.log(data.items);
			callback(data.items);
		};

		var failure = function(data){
			console.log(data);
		};

		todoApp.apiClient.getResource("/users/@me/lists", success, failure);
	};

	todoApp.handleTasksListClick = function(event){
		var tasksListNode = event.target;
		var tasksList = event.target.getAttribute('id');

		var success = function(data){
			var items = data.items;
			var tasksHtml = "";

			for(i=0;i<items.length;i++){
				item = items[i];
				tasksHtml += "<div id="+ item.id +">"+ item.title +"</div>";
			}

			var parentNode = document.getElementById(tasksList);
			var childNode = document.createElement("div");
			var idAttribute = document.createAttribute("id");
			idAttribute.value = tasksList + "_child";
			childNode.setAttributeNode(idAttribute);
			childNode.innerHTML = tasksHtml;
			parentNode.appendChild(childNode);
		};

		var failure = function(data){
			console.log(data);
		};

		todoApp.apiClient.getResource("/lists/" + tasksList +"/tasks", success, failure);
	};

	var populateTasksLists = function(items){
		var tasksListNode = document.getElementById("tasksList");
		var tasksHtml = "";

		for(i=0;i<items.length;i++){
			item = items[i];
			tasksHtml += "<div id="+ item.id +" onclick='todoApp.handleTasksListClick(event)'>"+ item.title +"</div>";
		}
		tasksListNode.innerHTML = tasksHtml;
	};

	var fn = function(event){
		getTasksList(populateTasksLists);
	};

	document.addEventListener('DOMContentLoaded', fn, false);	
	

})();
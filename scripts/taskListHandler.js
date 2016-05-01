(function(){

	var getTasksList = function(successCallback, failureCallback, taskListName){

		var success = function(data){
			successCallback(data);
		};

		var failure = function(data){
			failureCallback(data);
		};

		var url = "/users/@me/lists";
		if(taskListName !== undefined){
			url += "/"+taskListName;
		}

		todoApp.apiClient.getResource(url, success, failure);
	};

	var fn = function(event){
		var handler = {};
		handler.listTasksList = function(success, failure){
			getTasksList(success, failure);	
		};

		handler.getTasksList = function(listId, success, failure){
			getTasksList(success, failure, listId);				
		};

		handler.insertTasksList = function(taskListName, success, failure){
			var taskList = {};
			taskList.kind =  "tasks#taskList";
			taskList.title = taskListName;

			todoApp.apiClient.postResource("/users/@me/lists", taskList, success, failure);
		};

		handler.deleteTasksList = function(taskListId, success, failure){
			var url = "/users/@me/lists/" + taskListId;
			todoApp.apiClient.deleteResource(url, success, failure);			
		};

		handler.updateTasksList = function(taskListId, taskListName, success, failure){
			var taskList = {};
			taskList.kind =  "tasks#taskList";
			taskList.title = taskListName;
			taskList.id  = taskListId;

			var url = "/users/@me/lists/" + taskListId;
			todoApp.apiClient.updateResource(url, taskList, success, failure);			
		};

		return handler;
	};

	todoApp.taskListHandler = fn();

})();
(function(){

	var fn = function(event){

		var handler = {};
		handler.listTasks = function(taskListId, success, failure){
			var url = "/lists/" + taskListId +"/tasks";
			todoApp.apiClient.getResource(url, success, failure);
		};

		handler.insertTask = function(taskName, taskListId, success, failure){
			var task = {};
			task.kind =  "tasks#task";
			task.title = taskName;

			var url = "/lists/" + taskListId +"/tasks";
			todoApp.apiClient.postResource(url, task, success, failure);
		};

		handler.deleteTasks = function(taskId, taskListId, success, failure){
			var url = "/lists/" + taskListId +"/tasks/" + taskId;
			todoApp.apiClient.deleteResource(url, success, failure);			
		};

		handler.updateTasks = function(taskId, taskName, taskListId, success, failure){
			var task = {};
			task.kind =  "tasks#task";
			task.title = taskName;
			task.id  = taskId;

			var url = "/lists/" + taskListId +"/tasks/" + taskId;
			todoApp.apiClient.updateResource(url, task, success, failure);			
		};

		return handler;
	};

	todoApp.taskHandler = fn();

})();
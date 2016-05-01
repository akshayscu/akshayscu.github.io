(function(){

	var templateStore = function(){

		var store = {};

		store.getTaskListHtml = function(taskList){
			var title = taskList.title;
			var id = taskList.id;

			return "<li onclick='todoApp.handleSingleTasksListClick(event, &quot;"+id+"&quot;)' oncontextmenu='todoApp.handleTasksListRightClick(event, &quot;"+id+"&quot;)' id='"+   id +
					"'> <div><span>"+ title	+ 
					"</span><img src='images/minussymbol.jpg' onclick='todoApp.deleteTaskListClick(event, &quot;"+id+"&quot;)'></div><div id='"+ id +"_child' class='task hiddenSubTask'><ul id='"+id+"_tasks'></ul></div></li>";			
		};

		store.getBlankTaskList = function(){
			return "<div><input autofocus type='text' id='newTaskList' onkeypress='todoApp.handleAddNewTaskLists(event, this)' /></div>";
		};

		store.getBlankTask = function(id){
			return "<div><input autofocus type='text' id='newTask' onclick='todoApp.handleBlankTaskClick(event)' onkeypress='todoApp.handleAddNewTask(event, this, &quot;"+id+"&quot;)' /></div>";
		};

		store.getTaskHtml = function(task){
			var title = task.title;
			var id = task.id;

			return "<li id='"+id+"' oncontextmenu='todoApp.handleTasksRightClick(event, &quot;"+id+"&quot;)'><span>"+ title +"</span><img src='images/minussymbol.jpg' onclick='todoApp.deleteTaskClick(event, &quot;"+id+"&quot;)'></li>";
		};

		store.getAddTaskHtml = function(id){
			return "<li id='"+id+"_lastTaskNode' onclick='todoApp.addTaskClick(event, &quot;"+id+"&quot;)'>Add Task<img src='images/plussymbol.jpg'></li>";
		}

		return store;
	};

	todoApp.templateStore = templateStore();
})();
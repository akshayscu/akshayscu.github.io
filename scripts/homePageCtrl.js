(function(){

	var isAnyFieldInUpdateMode = false;

	var deleteHtmlNodeById = function(id){
		var child = document.getElementById(id);
		child.parentNode.removeChild(child);
	};

	var addTaskListToHTML = function(taskList){
		var newHtml =	todoApp.templateStore.getTaskListHtml(taskList);
		var listElement = document.getElementById("listOfTaskList");
		listElement.innerHTML = newHtml + listElement.innerHTML;
	};

	var deleteAllChildrenOfNode = function(parentElement){
		while (parentElement.firstChild) {
		    parentElement.removeChild(parentElement.firstChild);
		}
	};

	todoApp.handleBlankTaskClick = function(event){
		event.stopPropagation();
	};

	todoApp.addTaskListClick = function(event){
		if(isAnyFieldInUpdateMode == false){
			event.stopPropagation();
			var tbHtml = todoApp.templateStore.getBlankTaskList();	
			var parent = document.getElementById("listOfTaskList");	
			var lastElement = document.getElementById("lastTaskListNode");	
			var node = document.createElement("LI");
			node.setAttribute("id", "placeHolderDiv");
			node.innerHTML = tbHtml;
			parent.insertBefore(node , lastElement);
			isAnyFieldInUpdateMode = true;
		}
	};

	todoApp.addTaskClick = function(event, id){
		if(isAnyFieldInUpdateMode == false){
			event.stopPropagation();
			var tbHtml = todoApp.templateStore.getBlankTask(id);	
			var parent = document.getElementById(id + "_tasks");	
			var lastElement = document.getElementById(id + "_lastTaskNode");	
			var node = document.createElement("LI");
			node.setAttribute("id", "placeHolderTaskDiv");
			node.innerHTML = tbHtml;
			parent.insertBefore(node , lastElement);
			isAnyFieldInUpdateMode = true;
		}			
	};	

	todoApp.handleAddNewTaskLists = function(event, element){
		if(event.keyCode === 13 && element.value !== ""){

			var success = function(data){
				addTaskListToHTML(data);
				deleteHtmlNodeById("placeHolderDiv");
			};

			var failure = function(){
				console.log("Insert failed");
			};		

			isAnyFieldInUpdateMode = false;
			var taskName = element.value;
			todoApp.taskListHandler.insertTasksList(taskName, success, failure);
        }
	};

	todoApp.handleAddNewTask = function(event, element, taskListId){
		if(event.keyCode === 13 && element.value !== ""){

			var success = function(data){
				var parentElement = document.getElementById(taskListId + "_tasks");
				var taskHtml = todoApp.templateStore.getTaskHtml(data);
				parentElement.innerHTML = taskHtml + parentElement.innerHTML;
				deleteHtmlNodeById("placeHolderTaskDiv");
			};

			var failure = function(){
				console.log("Insert failed");
			};		

			isAnyFieldInUpdateMode = false;
			var taskName = element.value;
			todoApp.taskHandler.insertTask(taskName, taskListId, success, failure);
        }
	};

	todoApp.deleteTaskListClick = function(event, id){
		event.stopPropagation();
		//delete tasks
		var success = function(){
			deleteHtmlNodeById(id);
		};

		var failure = function(){
			console.log("Cant delete");
		};		

		todoApp.taskListHandler.deleteTasksList(id, success, failure);		
	};

	todoApp.deleteTaskClick = function(event, id){
		event.stopPropagation();
		//delete tasks
		var success = function(){
			deleteHtmlNodeById(id);
		};

		var failure = function(){
			console.log("Cant delete");
		};		

		var elementToBeDeleted = document.getElementById(id);
		var tasskListId = elementToBeDeleted.parentNode.parentNode.parentNode.id;
		todoApp.taskHandler.deleteTasks(id, tasskListId, success, failure);		
	};	

	todoApp.handleSingleTasksListClick = function(event, id){
		event.stopPropagation();
		//Show tasks
		var parentElement = document.getElementById(id + "_child");
		var classes = parentElement.className;

		if(classes.indexOf("hiddenSubTask") !== -1){
			var tasksLoadSuccess = function(data){
				var element = document.getElementById(id + "_tasks");

				deleteAllChildrenOfNode(element);
				parentElement.className = classes.replace("hiddenSubTask","");

				if(data.items !== undefined){
					for(var i=0;i<data.items.length;i++){
						if(data.items[i].title != ""){
							var taskHtml = todoApp.templateStore.getTaskHtml(data.items[i]);
							element.innerHTML = taskHtml + element.innerHTML;
						}	
					}
				}
				element.innerHTML += todoApp.templateStore.getAddTaskHtml(id);				
			};

			var tasksLoadFailure = function(data){
				console.log(data);
			};

			todoApp.taskHandler.listTasks(id, tasksLoadSuccess, tasksLoadFailure);
		}
		else{
			parentElement.className += " hiddenSubTask"; 
		}					
	};

	todoApp.handleUpdateTaskList = function(event, element, id){
		if(event.keyCode === 13 && element.value !== ""){

			var success = function(data){
				deleteHtmlNodeById(id);
				addTaskListToHTML(data);
				isAnyFieldInUpdateMode = false;
			};

			var failure = function(){
				isAnyFieldInUpdateMode = false;
				console.log("Update failed");
			};		

			var taskName = element.value;
			todoApp.taskListHandler.updateTasksList(id, taskName, success, failure);
        }
	};	

	todoApp.handleTasksListRightClick = function(event, id){
		if(isAnyFieldInUpdateMode === false){
			event.preventDefault();
			isAnyFieldInUpdateMode = true;
			//Update TaskList
			//1. get the value of the taskList. Set it to a var. 
			//2. replace the span with tb with var value.
			var element  = document.getElementById(id);
			var parentElement = element.children[0];	
			var targetElement = parentElement.children[0];
			var taskListOldValue = targetElement.innerHTML;

			//create a replacement Node
			var textElement = document.createElement("input");
			textElement.id = "updateTextNode";
			textElement.value = taskListOldValue;
			textElement.addEventListener("keypress", function(event){
				todoApp.handleUpdateTaskList(event, textElement, id);
			});

			//replace the contents of div with the text node
			deleteAllChildrenOfNode(parentElement);
			parentElement.appendChild(textElement);			
		}
	};	

	todoApp.handleUpdateTask = function(event, element, id){
		if(event.keyCode === 13 && element.value !== ""){
			var tlId = document.getElementById(id).parentNode.parentNode.parentNode.id;
			var success = function(data){
				deleteHtmlNodeById(id);
				var parentElement = document.getElementById(tlId + "_tasks");
				var taskHtml = todoApp.templateStore.getTaskHtml(data);
				parentElement.innerHTML = taskHtml + parentElement.innerHTML;
				isAnyFieldInUpdateMode = false;
			};

			var failure = function(){
				isAnyFieldInUpdateMode = false;
				console.log("Update failed");
			};		

			var taskName = element.value;
			todoApp.taskHandler.updateTasks(id, taskName, tlId, success, failure);
        }
	};	

	todoApp.handleTasksRightClick = function(event, id){
		if(isAnyFieldInUpdateMode === false){
			event.preventDefault();
			event.stopPropagation();

			isAnyFieldInUpdateMode = true;
			//Update TaskList
			//1. get the value of the taskList. Set it to a var. 
			//2. replace the span with tb with var value.
			var parentElement = document.getElementById(id);	
			var targetElement = parentElement.children[0];
			var taskListOldValue = targetElement.innerHTML;

			//create a replacement Node
			var textElement = document.createElement("input");
			textElement.id = "updateTextNode";
			textElement.value = taskListOldValue;
			textElement.addEventListener("keypress", function(event){
				todoApp.handleUpdateTask(event, textElement, id);
			});
			textElement.addEventListener("click", function(event){
				todoApp.handleBlankTaskClick(event);
			});			

			//replace the contents of div with the text node
			deleteAllChildrenOfNode(parentElement);
			parentElement.appendChild(textElement);			
		}
	};

	var homePageController = function(event){
		//get all the taskList from rest
		var tasksListLoadSuccess = function(list){
			var element = document.getElementById("listOfTaskList");
			//iterate through the array and get the HTML for all the taskList 
			for(var i=0;i<list.items.length;i++){
				var taskListHtml = todoApp.templateStore.getTaskListHtml(list.items[i]);
				//add the list to the taskList ul
				element.innerHTML = taskListHtml + element.innerHTML;
			}
		};

		var tasksListLoadFailure = function(error){
			console.log(error);
		};

		todoApp.taskListHandler.listTasksList(tasksListLoadSuccess, tasksListLoadFailure);
	};

	document.addEventListener('DOMContentLoaded', homePageController, false);		

})();
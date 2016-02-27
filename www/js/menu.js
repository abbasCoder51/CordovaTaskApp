var app = {
	
    // Application Constructor
    initialize: function() 
	{
        this.bindEvents();
		this.loadStorage();
    },

    bindEvents: function() 
	{
        getElement("add_task").addEventListener("click", addTasks);
    },
	
	loadStorage: function(){
		window.localStorage.clear();
		if(!window.localStorage.length)
			window.localStorage.setItem("ids", "[]");
			window.localStorage.setItem("tasks", "[]");

	}

};

function addTasks()
{
	
	var task_input = getElement("text_task").value;
	
	if(task_input)
	{
		// retreive task from local storage
		var jsonObj = JSON.parse(window.localStorage.getItem("ids"));
		var idValue = getNextID(jsonObj);
		jsonObj.push(idValue);
		
		var jsonObj1 = JSON.parse(window.localStorage.getItem("tasks"));
		jsonObj1.push(task_input);

		// add task to local storage
		window.localStorage.setItem("ids", JSON.stringify(jsonObj));
		window.localStorage.setItem("tasks", JSON.stringify(jsonObj1));
		console.log(window.localStorage);
		
		// add element to screen
		var list_item = document.createElement("div");
		var t = document.createTextNode(task_input);
		list_item.appendChild(t);
		list_item.setAttribute("class", "list_item");
		list_item.setAttribute("id", "task_item_" + idValue);
		
		getElement("task_list").appendChild(list_item);
		
		// add onlick event
		getElement("task_item_" + idValue).addEventListener("click", function(){
				removeTask(this.id);
		});
		
		// retreive local storage key
		//var storage_task = window.loadStorage.getItem("Task");

		// clear input field
		getElement("text_task").value = "";
	}
	
}

function removeTask(id)
{

	var parentElement = getElement("task_list");
	var childElement = getElement(id);
	parentElement.removeChild(childElement);
	
	var jsonObj = JSON.parse(window.localStorage.getItem("ids"));
	var jsonObj1 = JSON.parse(window.localStorage.getItem("tasks"));
	var res = id.match(/_([0-9]+)$/);
	var foundId = findID(res[1]);
	
	if(foundId > -1)
	{
		jsonObj.splice(foundId, 1);
		
		console.log(jsonObj1);
		jsonObj1.splice(foundId, 1);

	}
	
	// TODO: enclose string values in quotes before storing back into localStorage
	
	window.localStorage.setItem("ids", JSON.stringify(jsonObj));
	window.localStorage.setItem("tasks", JSON.stringify(jsonObj1));
	console.log(window.localStorage);
	
}

function loadTasks(task_input)
{
	
	if(task_input)
	{
		
		var list_item = document.createElement("div");
		var t = document.createTextNode(task_input);
		list_item.appendChild(t);
		list_item.setAttribute("class", "list_item");
		getElement("task_list").appendChild(list_item);

	}
	
}

function getNextID(array)
{
	var initVal = 0;
	for(var i =0;i<array.length;i++)
	{
		if(array[i] > initVal)
		{
			initVal = array[i];
		}
	}
	return initVal + 1;
}

function findID(findVal){
	
	var idVal = -1;
	var jsonObj = JSON.parse(window.localStorage.getItem("ids"));
	for(var i =0;i<jsonObj.length;i++)
	{
		if(jsonObj[i] == findVal)
		{
			idVal = i;
			break;
		}
	}
	return idVal;
	
}

// return element by id
function getElement(id)
{
	return document.getElementById(id);
}

app.initialize();


























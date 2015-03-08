document.jsonData = null;
document.jsonLoaded = false;

// Fetch a JSON document from the specified URL
// then parse it and store it in document.jsonData.
// Set document.jsonLoaded to true when finished
function loadJSONDocument(url, callback) {
	request = new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState==4 && request.status==200) {
			response = request.responseText;
			document.jsonData = JSON.parse(response);
			document.jsonLoaded = true;
			if (callback)
				callback();
		}	
	}
	request.open("GET",url,true);
	request.send();
}

// Get all tasks which were either created on or closed on the given date
function getTasksOnDate(date) {
	if (!document.jsonLoaded)
		throw "JSON must be loaded first";
	results = [];
	for (index = 0; index < document.jsonData.length; index++) {
		task = document.jsonData[index];
		createDate = new Date(task.createDate);
		if (createDate.setUTCHours(0,0,0,0) == date.setUTCHours(0,0,0,0))
		{
			results.push(task);
		}
		else if (task.closeDate){
			closeDate = new Date(task.closeDate);
			if (closeDate.setUTCHours(0,0,0,0) == date.setUTCHours(0,0,0,0))
			{
				results.push(task);
			}
		}
	}
	return results;
}

// Get all tasks that were created or closed on or after the start date,
// but before the end date
function getTasksBetweenDates(startDate,endDate) {
	if (!document.jsonLoaded)
		throw "JSON must be loaded first";
	results = [];
	for (index = 0; index < document.jsonData.length; index++) {
		task = document.jsonData[index];
		createDate = new Date(task.createDate);
		if ((createDate.setUTCHours(0,0,0,0) >= startDate.setUTCHours(0,0,0,0)) && (createDate.setUTCHours(0,0,0,0) < endDate.setUTCHours(0,0,0,0)))
		{
			results.push(task);
		}
		else if (task.closeDate){
			closeDate = new Date(task.closeDate);
			if ((closeDate.setUTCHours(0,0,0,0) >= startDate.setUTCHours(0,0,0,0)) && (closeDate.setUTCHours(0,0,0,0) < endDate.setUTCHours(0,0,0,0)))
			{
				results.push(task);
			}
		}
	}
	return results;
}

// Get the number of tasks with the given instanceId
function getTaskCount(instanceId) {
	if (!document.jsonLoaded)
		throw "JSON must be loaded first";
	count = 0;
	for (index = 0; index < document.jsonData.length; index++) {
		task = document.jsonData[index];
		if (task.instanceId == instanceId)
			count++;
	}
	return count;
}

// Get the name of the most recently created task with the given instance Id
function getMostRecentTask(instanceId) {
	if (!document.jsonLoaded)
		throw "JSON must be loaded first";
	name = null;
	mostRecent = 0;
	for (index = 0; index < document.jsonData.length; index++) {
		task = document.jsonData[index];
		if (task.instanceId == instanceId)
		{
			createDate = new Date(task.createDate);
			if (createDate > mostRecent)
			{
				mostRecent = createDate;
				name = task.name;
			}
		}
	}
	return name;
}
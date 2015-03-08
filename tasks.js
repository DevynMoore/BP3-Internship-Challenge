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

function getTasksOnDate(date) {
	results = [];
	for (index = 0; index < document.jsonData.length; index++) {
		task = document.jsonData[index];
		createDate = new Date(task.createDate);
		if (createDate.getUTCFullYear() == date.getUTCFullYear() && createDate.getUTCMonth() == date.getUTCMonth() && createDate.getUTCDate() == date.getUTCDate())
		{
			results.push(task);
		}
		else if (task.closeDate){
			closeDate = new Date(task.closeDate);
			if (closeDate.getUTCFullYear() == date.getUTCFullYear() && closeDate.getUTCMonth() == date.getUTCMonth() && closeDate.getUTCDate() == date.getUTCDate())
			{
				results.push(task);
			}
		}
	}
	return results;
}
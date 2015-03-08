document.jsonData = null;
document.jsonLoaded = false;

// Fetch a JSON document from the specified URL
// then parse it and store it in document.jsonData.
// Set document.jsonLoaded to true when finished
function loadJSONDocument(url) {
	request = new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState==4 && request.status==200) {
			response = request.responseText;
			document.jsonData = JSON.parse(response);
			document.jsonLoaded = true;
		}	
	}
	request.open("GET",url,true);
	request.send();
}
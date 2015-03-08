# BP3-Internship-Challenge
This is my solution to the BP3 Internship Challenge.

# Files
- *tasks.js* - This file contains the javascript solutions to the challenge
- *task.json* - This is the provided JSON data file
- *index.html* - Calls the javascript functions and displays some sample results

# Functions
*tasks.js* contains the following functions
- **loadJSONDocument(url, callback)** - Fetches the JSON file at the specified url using AJAX and parses it, then calls the callback function
- **getTaskCountBetweenDates(startDate,endDate)** - Returns a javascript object with two properties: opened and closed. Opened is the number of tasks opened between the given dates, and closed is the number of tasks closed between the given dates.
- **getTaskCountOnDate(date)** - Returns a javascript object with two properties: opened and closed. Opened is the number of open tasks on the given date, including those opened on that date. Closed is the number of closed tasks on the given date, including those closed on that date.
- **getTaskCount(instanceId)** - Returns the number of tasks created by the given instance
- **getMostRecentTask(instanceId)** - Returns the name of the most recently created task by the given instance

Because the **loadJSONDocument** function loads the file using AJAX, the JSON file must be located on a server rather than being a local file.

All of the functions will throw an error if they are called before **loadJSONDocument** finishes parsing the JSON file. To ensure they
do not execute until then, call them in the callback function given to **loadJSONDocument** which will only run after the parsing has completed.

const e = React.createElement;

/**init import JSON structure
 * @param activityList to push the first activity 
 * @return data object
 */
export function init(activityList,story,server){
   
    const temp = readJSON(server,story);
    const data = JSON.parse(temp);
    data.activities.unshift(data.firstActivity);
    data.activities.push(data.lastActivity);
    data.activities.push(data.lastActivity);
    activityList.push(data.activities[0]);
    return data;
}

/**
 * Import JSON files
 * @param file : file to import
 * @returns a file JSON
 */

export function readJSON(server,story) {
    let title = story + ".json";
    let request = new XMLHttpRequest();
    request.open('GET', `${server}/requestJson/${title}`, false);
    request.send(null);
    //console.log(request.responseText);
    if (request.status == 200)
        return request.responseText;
}

/**
 * Append messages to a container
 * @param message : message to send
 * @param container : container of the message to append
 * @returns null
 */
export function appendMessage(message, container) {
    const messageContainer = document.getElementById(container);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}

/**
 * Vai Marco, scrivi che cazzo fa
 * @param props 
 * @param counter 
 */
export function loadHelpMessage(props, counter){
    const messageContainer = document.getElementById("help-message-container");
    messageContainer.innerHTML = "";
    var message = props.v[counter].help;
    message = (message == null) ?  "Non ci sono aiuti per questa activity!" : message;
    appendMessage(message, "help-message-container");
}

/**
 * Check if the key pressed is enter
 * @param event
 * @returns true if it is enter, false otherwise
 */
export function isEnter(event) {
    return event.key == "Enter" ? true : false;
}

export function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}


/**
 * Import JSON files
 * @param file : file to import
 * @returns a file JSON
 */
export function readJSON(file) {
    let request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);

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

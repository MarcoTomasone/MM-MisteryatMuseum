import Activity from './Activity.js'

const e = React.createElement;
const {Icon, IconButton, Collapse, TextField, Slide, Paper}  = MaterialUI;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

//Chat
const socket = io('http://localhost:3000')
//waiting event
socket.on('chat-message', data => {
    appendMessage(`<b>${data.name}</b>: ${data.message}`)
   //   appendMessage(data)
})


function appendMessage(message) {
    const messageContainer = document.getElementById("message-container")
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}


function App2() {

    React.useEffect(() => {
        document.getElementById("body2").style.height = `${screen.availHeight}px`;
        document.getElementById("body2").style.width = `${screen.availWidth}px`;
                }, [])

    function readJSON(file) {
        let request = new XMLHttpRequest();
        request.open('GET', file, false);
        request.send(null);
        if (request.status == 200)
            return request.responseText;
    }

    const temp = readJSON('./Document.json');
    const data = JSON.parse(temp);
    
    let activityList = [];

    for(let i = 0;i < data.accessibility.activities.length - 1;i++) {
        activityList.push(data.accessibility.activities[i]);
    }
    
 
    //boolean for the chat
    const [slideHelp, setSlideHelp] = React.useState(false);
    const [slideChat, setSlideChat] = React.useState(false);
   
    const sendMessage = function (){
        const messageInput = document.getElementById("message-input")
        const message = messageInput.value
        appendMessage(`<b>You</b>: ${message}`) //print client side 
        socket.emit('send-chat-message', {message: message})  //server side
        messageInput.value = '' //clean the input text
    } 

        
    function openHelp() {
        setSlideHelp(true);
        //REFACTORING E TUTTO IN UNA FUNZIONE 
        const messageContainer = document.getElementById("help-message-container")
        const message = data.accessibility.activities[2].help
        const messageElement = document.createElement('div')
        messageElement.innerHTML = message
        messageContainer.append(messageElement)
    }

    return e(React.Fragment, null, [
        e("div", null, [    
            e("div", {key:"player",id:"player",style:div_a}, [
                e("nav",{style:navbar,id:"navPlayer"},
                e(IconButton, {children: e(Icon, {children: "chat", color: "primary"}), onClick: ()=> {setSlideChat(true);}}), 
                e(IconButton, {children: e(Icon, {children: "help", color: "primary"}), onClick: openHelp})
            )],
            e(Activity, { json:data,  v : activityList })),
            e(Slide, {in: slideChat, direction: "right", id: "slide-chat", children: e(Paper, null, [
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideChat(false)}}),
                    e("div",{id: "message-container", style: {overflow:"scroll", width: "80%", height: "50%", margin: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                    e("form", {id: "send-container"}, [
                        e(TextField, {id: "message-input", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                            e(IconButton, {id:"send-button", onClick: sendMessage, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                            )
                        ])
            ])}),
            e(Slide, {in: slideHelp, direction:"down", id: "slide-help",unmountOnExit: false, children: e(Paper, null, [   //unmountOnExit: true -> but we have a problem
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideHelp(false)}}),
                    e("div",{id: "help-message-container", style: {overflow:"scroll", width: "80%", height: "60%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
            ])})
        ])
    ])        
    }
        
export default App2;






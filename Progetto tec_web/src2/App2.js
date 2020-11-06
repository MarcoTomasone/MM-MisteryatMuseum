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
    activityList.push(data.accessibility.activities[0]);
    
    //console.log(data.accessibility.player.thicknessFrame );

    //nei campi style ricordati di sostituire 'px' inoltre da sistemare graficamente
    //tecnica substring()

    const player= {
        //overflow:'hidden',
        height:'100%',
        width:'100%',
        //backgroundColor: 'green'
        background:  data.accessibility.player.background ,

        thicknessFrame:`${data.accessibility.player.weightFont}px`,
        topFrame:`${data.accessibility.player.topFrame}px`,
        weightFont:`${data.accessibility.player.weightFont}px`,
        widthFrame: `${data.accessibility.player.widthFrame}px`
    };

  //  console.log(data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) );
    const btnChat={
        backgroundColor:data.accessibility.player.chatButton.backgroundColor,
        borderRadius:`${data.accessibility.player.chatButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.chatButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.chatButton.top * screen.availHeight/437}px`,
        left:`${data.accessibility.player.chatButton.left * screen.availWidth /202}px`,
        //borderColor:data.accessibility.player.chatButton.borderColor,
        position:'absolute'
        /*textColor: ''+data.accessibility.player.chatButton.textColor+'',
        position:'relative' */
    };

    const btnHelp={
        backgroundColor:data.accessibility.player.helpButton.backgroundColor,
        //borderColor:data.accessibility.player.borderColor,
        borderRadius:`${data.accessibility.player.helpButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.helpButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.helpButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.helpButton.top * screen.availHeight /437}px`,
        left:`${data.accessibility.player.helpButton.left * screen.availWidth /202}px`,
        position:'absolute'
    };

    const navbar ={
        //padding:'5px',
       // height:'90%',
    };

    //boolean for the chat
    const [expanded, setExpanded] = React.useState(false);
    const [slide, setSlide] = React.useState(false);
    
    //Function to open and close the chat
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    
    const sendMessage = function (){
        const messageInput = document.getElementById("message-input")
        const message = messageInput.value
        appendMessage(`<b>You</b>: ${message}`) //print client side 
        socket.emit('send-chat-message', {message: message})  //server side
        messageInput.value = '' //clean the input text
    } 


const divActivity = {      //style della div contenente le activity
    border:data.accessibility.activityStyle.divisor.border,
    overflow:"scroll",
    borderColor: data.accessibility.activityStyle.divisor.borderColor,
    left:data.accessibility.activityStyle.divisor.left* screen.availWidth /202 +"px",
    width:data.accessibility.activityStyle.divisor.width *screen.availWidth /437+"px",
    height:data.accessibility.activityStyle.divisor.height * screen.availHeight /202+"px",
    top: data.accessibility.activityStyle.divisor.top * screen.availHeight /437+"px",
    position:'absolute',
    
};
console.log(btnHelp);
console.log(divActivity);
    return e(React.Fragment, null, [
        e("div", null, [    
            e("div", {key:"player",id:"player",style:player}, [
                e("nav",{style:navbar,id:"navPlayer"},
                e(IconButton, {children: e(Icon, {children: "chat", color: "primary"}), onClick: ()=> {setSlide(!slide);}}), 
                e(IconButton, {children: e(Icon, {children: "help", color: "primary"})})
            )]),
            e(Slide, {in: slide, direction: "right", id: "slide", children: e(Paper, null, [
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                    e("div",{id: "message-container", style: {width: "80%", height: "50%", margin: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                    e("form", {id: "send-container"}, [
                        e(TextField, {id: "message-input", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                            e(IconButton, {id:"send-button", onClick: sendMessage, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                            )
                        ])
            ])}),
            e(Activity, { json:data,  v : activityList })
        ])
    ])        
    }
        
        
export default App2;






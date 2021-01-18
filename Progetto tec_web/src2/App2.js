import Activity from './Activity.js'
import {readJSON, appendMessage} from '../utils.js'
import { getID } from './dataHandler.js';

const e = React.createElement;
const {Icon, IconButton, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Slide, Paper}  = MaterialUI;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

//Chat
const socket = io('http://localhost:3000', {query: 'type=player'})



//waiting event
socket.on('message-from-evaluator', data => {
    appendMessage(`<b>${data.name}</b>: ${data.message}`, "message-container")
})


const temp = readJSON();
const data = JSON.parse(temp);
data.accessibility.activities.unshift(data.accessibility.firstActivity);
data.accessibility.activities.push(data.accessibility.lastActivity);

let activityList = [];
activityList.push(data.accessibility.activities[0]);
console.log(data);
//console.log(activityList);
function App2() {
 
    //Dizionario con key:"title" (of Activity ) value:"number"(of index Activities)       
    var dictionaryActivity =new Map;
    for(let i = 0;i<data.accessibility.activities.length;i++){
        dictionaryActivity.set( data.accessibility.activities[i].title , i);
    }
    //console.log(dictionaryActivity);

    var [backgroundImg,setBackgroundImg] = React.useState(0);
    React.useEffect(() => {
        document.getElementById("body2").style.height = `${screen.availHeight}px`;
        document.getElementById("body2").style.width = `${screen.availWidth}px`;
                }, [])

   
    const navbar ={
        //padding:'5px',
       // height:'90%',
    };
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

if(data.accessibility.player.backgroundImageCheck ==="true"){
    var base64data;
    
    axios.get(`http://localhost:8000/downloadBackground/${data.accessibility.player.backgroundImageUrl}`, { responseType:"blob" })
            .then(function (response) {
            var blob1 = response.data;
            const blob = new Blob([blob1], { type: 'image/png' });
            var reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function() {
                base64data = reader.result;                
                setBackgroundImg(backgroundImg = base64data);
                }
    });      

    var div_a = {      //style della div contenente le activity
        border:data.accessibility.activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: data.accessibility.activityStyle.divisor.borderColor,
        position:'absolute',
        backgroundImage : 'url('+backgroundImg+')',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        thicknessFrame:`${data.accessibility.player.weightFont}px`,
        topFrame:`${data.accessibility.player.topFrame}px`,
        weightFont:`${data.accessibility.player.weightFont}px`,
        widthFrame: `${data.accessibility.player.widthFrame}px`
        
    };
   
}else{
    var div_a = {      //style della div contenente le activity
        border:data.accessibility.activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: data.accessibility.activityStyle.divisor.borderColor,
        position:'absolute',
        background: data.accessibility.player.background,
        thicknessFrame:`${data.accessibility.player.weightFont}px`,
        topFrame:`${data.accessibility.player.topFrame}px`,
        weightFont:`${data.accessibility.player.weightFont}px`,
        widthFrame: `${data.accessibility.player.widthFrame}px`
        
    };
}

    //State for holding the Chat and Help button 
    const [slideHelp, setSlideHelp] = React.useState(false);
    const [slideChat, setSlideChat] = React.useState(false);
    const [dialog, setDialog] = React.useState(true);
    const [id, setID] = React.useState("");

   function handleClose() {
        setDialog(false);
        const idContainer = document.getElementById("id-input");
        const playerID = idContainer.value;
        setID(playerID);
        getID(playerID, activityList[0].question);
        socket.emit('new-player', {playerID});
        //si potrebbe passare al server come 
        //parametro l'id e lui restituisce il json corrispondente 
    }
  

    const sendMessage = function (){
        const messageInput = document.getElementById("message-input")
        const message = messageInput.value
        appendMessage(`<b>You</b>: ${message}`, "message-container") //print client side 
        socket.emit('send-to-evaluator', {message: message, id})  //server side
        messageInput.value = '' //clean the input text
    } 

 
    return e(React.Fragment, null, [
        e("div", null, [    
            //e("div", {key:"player",id:"player",style:div_a}, [
                //e("nav",{style:navbar,id:"navPlayer"},
                e(IconButton, {children: e(Icon, {children: "chat", color: "primary"}), onClick: ()=> {setSlideChat(!slideChat);}}), 
                e(IconButton, {children: e(Icon, {children: "help", color: "primary"}), onClick: ()=> {setSlideHelp(!slideHelp);}}),
            //)],
                    //open : dialog
            e(Dialog, {open: dialog, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, null, "BENVENUTO IN MISTERY AT MUSEUM"),
                e(DialogContent, null, [
                    e(DialogContentText, null, "Inserisci il tuo id o quello del tuo gruppo!"),
                    e("form", {id: "id-container"}, [
                        e(TextField, {id: "id-input", variant: "outlined", margin: "dense", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                        e(IconButton, {id:"id-send-button", onClick: handleClose, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                        )
                    ])
                ]),
            ]),
            e(Activity, { json:data,  v : activityList, playerId : id, dictionaryActivity : dictionaryActivity, socket: socket}),
            e(Slide, {in: slideChat, direction: "right", id: "slide-chat", style : {width : "90%"}, children: e(Paper, null, [
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideChat(false)}}),
                    e("div",{id: "message-container", style: {overflow:"scroll", width: "80%", height: "50%", margin: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                    e("form", {id: "send-container"}, [
                        e(TextField, {id: "message-input", variant: "outlined", margin: "dense", multiline: true, rows: "1", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                            e(IconButton, {id:"send-button", onClick: sendMessage, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                            )
                        ])
            ])}),
            e(Slide, {in: slideHelp, direction:"down", id: "slide-help",unmountOnExit: false, children: 
            e(Paper, null, [   //unmountOnExit: true -> but we have a problem
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideHelp(false)}}),
                    e("div",{id: "help-message-container", style: {overflow:"scroll", width: "80%", height: "60%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
            ])})
        ])
    ])        
    }
        

    
    
        
export default App2;






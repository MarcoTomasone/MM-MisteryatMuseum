import { Activity } from './Activity.js'
import {init, appendMessage, isEnter} from '../utils.js'
import { getID } from './dataHandler.js';
import {getButtonChatProperty, getScoreProperty,getButtonHelpProperty,getActivityNoBackground,getActivityIMG} from './style.js'
const e = React.createElement;
const { Icon, IconButton, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Slide, Paper, Badge}  = MaterialUI;

//const url = window.location.href;
//const story = url.replace("http://127.0.0.1`/src2/player.html?story=", "");
const story = "Matteo_0";

const server = "http://localhost:8000"; //http://site181997.tw.cs.unibo.it
//Chat
const socket = io(server, {query: 'type=player'})
socket.emit('new-player');
//waiting event



let activityList = [];
const helpArray = [];
const data = init(activityList,story,server);

function App2() {

    const [width,setWidth] = React.useState(window.innerWidth);
    const [height,setHeight] = React.useState(window.innerHeight);

    $(window).resize(function(){
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    })

    const [counter,setCounter] = React.useState(0);
    //State for holding the Chat and Help button 
    const [slideHelp, setSlideHelp] = React.useState(false);
    const [slideChat, setSlideChat] = React.useState(false);
    const [badgeChat, setBadgeChat] = React.useState(true);
    const [badgeHelp, setBadgeHelp] = React.useState(true);
    const [message, setMessage] = React.useState(false);
    const [help, setHelp] = React.useState(false);
    const [id, setID] = React.useState("");
    const [points, setPoints] = React.useState(0);
    //const [dialog, setDialog] = React.useState(true);


        function handleBadgeChat(){
            if(!slideChat)
               setBadgeChat(false);
            setMessage(false);
        }

        function handleBadgeHelp(){
            if(!slideHelp)
               setBadgeHelp(false);
            setHelp(false);
        }

        React.useEffect(() => {
            socket.on('set-id', data => {
                setID(data.id);
                getID(data.id, story, activityList[0].activityText);
            });
            
            socket.on('message-from-evaluator', data => {
                appendMessage(`<b>${data.name}</b>: ${data.message}`, "message-container")
                setMessage(true);
            });

        }, []);

        React.useEffect(()=>{
            if(message == true)
                handleBadgeChat();
            if (help == true)
                handleBadgeHelp();
        },[message, help]);

        React.useEffect(()=> {
            socket.on('add-points', data => {
                setPoints(points + parseInt(data.points));
            });

           
        });

        React.useEffect(()=>{
            socket.on('help-from-evaluator' , data => {
                const p = document.getElementById("p" + data.nElem);
                if(data.section == counter && p!= null){
                    setHelp(true);
                    p.innerHTML += "<br>" + "<b>Risposta:</b>" + data.answer;
                }
            });
        }, [counter]);

        //Dizionario con key:"title" (of Activity ) value:"number"(of index Activities)       
        var dictionaryActivity = new Map;
        for(let i = 0;i<data.activities.length;i++){
            dictionaryActivity.set( data.activities[i].title , i);
        }

        var [backgroundImg,setBackgroundImg] = React.useState(0);
        React.useEffect(() => {
            document.getElementById("body2").style.outerHeight = `${window.innerHeight}px`;
            document.getElementById("body2").style.outerWidth = `${window.innerWidth}px`;
                    }, [])

   
        const navbar ={
            height: "15%"
        };

        const btnChat = getButtonChatProperty(activityList,counter,data,height,width);
        const pointStyle = getScoreProperty(data,height,width);
        const btnHelp = getButtonHelpProperty(activityList,counter,data,height,width);

    if( ( activityList[counter].backgroundImage!=="" )|| (data.player.backgroundImage !== "")){
        const path = (activityList[counter].backgroundImage!=="" )?activityList[counter].backgroundImage : data.player.backgroundImage;
        var base64data;
        axios.get(`${server}/downloadBackground/${path}`, { responseType:"blob" })
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

        var div_a = getActivityIMG(data,backgroundImg);
    }else{
        var div_a = getActivityNoBackground(data);
    }

   /*function handleClose() {
        setDialog(false);
        const idContainer = document.getElementById("id-input");
        const playerID = idContainer.value;
        setID(playerID);
        getID(playerID, activityList[0].question);
        socket.emit('new-player', {playerID});
    }*/

    const sendMessage = function (){
        const messageInput = document.getElementById("message-input")
        const message = messageInput.value
       
        if(message != "" && message != "\n"){
            appendMessage(`<b>You</b>: ${message}`, "message-container") //print client side 
            socket.emit('send-to-evaluator', {message: message, id})  //server side
        } 
        messageInput.value = "" //clean the input text
    } 

    const sendHelp = function (){
        const container = document.getElementById("help-message-container");
        const helpInput = document.getElementById("help-message-input");
        const message = helpInput.value;
        if(message != "" && message != "\n"){
            helpArray.push(message);
            const length = helpArray.length;
            const helpP = document.createElement("p");
            helpP.setAttribute("id", "p" + length);
            helpP.innerHTML = "<b>Domanda:</b>" + message;
            container.append(helpP);
            socket.emit('send-help-text', {question: message, id, nElem: length, section: counter})  //server side
            helpInput.value = ''; //clean the input text
        }
        console.log(helpArray);
        console.log(counter);
    } 

 
    return e(React.Fragment, null, [ 
            e("div", {key:"player",id:"player",style:div_a}, [
                e("div",{style:navbar,id:"navPlayer"},
                e("button", {id:"chat-button",style:btnChat, onClick: ()=> {setSlideHelp(false) ; setSlideChat(!slideChat); setBadgeChat(true)}}, [ e(Badge, {id: "badgeChat", color: "secondary", variant: "dot", invisible: badgeChat, children : "CHAT"})]), 
                e("div", {id: "points", style: pointStyle}, "Points:" + points),
                e("button", {id:"help-button",style:btnHelp, onClick: ()=> {setSlideChat(false) ; setSlideHelp(!slideChat); setBadgeHelp(true)}}, [ e(Badge, {id: "badgeHelp", color: "secondary", variant: "dot", invisible: badgeHelp, children : "HELP"})]), 
            )],      
          /*  e(Dialog, {open: dialog, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, null, "BENVENUTO IN MISTERY AT MUSEUM"),
                e(DialogContent, null, [
                    e(DialogContentText, null, "Inserisci il tuo id o quello del tuo gruppo!"),
                    e("form", {id: "id-container"}, [
                        e(TextField, {id: "id-input", variant: "outlined", margin: "dense", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                        e(IconButton, {id:"id-send-button", onClick: handleClose, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                        )
                    ])
                ]),
            ]),*/
            e(Activity, {counter:counter,server: server,setCounter:setCounter, json:data,  v : activityList, playerId : id, dictionaryActivity : dictionaryActivity, socket: socket, points: points, setPoints: setPoints, story : story}),
            e(Slide, {in: slideChat, direction: "left", id: "slide-chat", children: e(Paper, null, [
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideChat(false)}}),
                    e("div",{id: "message-container"}), //div di arrivo delle risposte da valutare
                    e("form", {id: "send-container"}, [
                        e(TextField, {id: "message-input", onKeyDown: () => {isEnter(event)? sendMessage() : null},variant: "outlined", margin: "dense", multiline: true, rows: "1", style: {width: "80%", marginLeft : "10%"}, InputProps: {endAdornment:
                            e(IconButton, {id:"send-button", onClick: sendMessage,  children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                            )
                        ])
            ])}),
            e(Slide, {in: slideHelp, direction:"down", id: "slide-help", style : {height : "70%"} , unmountOnExit: false, children: e(Paper, null, [  
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlideHelp(false)}}),
                    e("div",{id: "help-message-container"}), //div di arrivo delle risposte da valutare
                    e("form", {id: "send-container"}, [
                        e(TextField, {id: "help-message-input",onKeyDown: () => {isEnter(event)? sendHelp() : null}, variant: "outlined", margin: "dense", multiline: true, rows: "1", style: {width: "80%", marginLeft : "10%"}, InputProps: {endAdornment:
                            e(IconButton, {id:"send-button", onClick: sendHelp, children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                            )
                        ])
            ])})
        )
    ])        
    }
        
export default App2;






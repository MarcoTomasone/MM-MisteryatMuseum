import { Activity } from './Activity.js'
import {readJSON, appendMessage, isEnter, getRandomInt} from '../utils.js'
import { getID } from './dataHandler.js';
import {getButtonChatProperty, getScoreProperty} from './style.js'
const e = React.createElement;
const { Icon, IconButton, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Slide, Paper}  = MaterialUI;

//const url = window.location.href;
//const story = url.replace("http://127.0.0.1`/src2/index2.html?story=", "");
const story = "Simone_4";
//Chat
const socket = io('http://localhost:8000', {query: 'type=player'})
socket.emit('new-player');
//waiting event
    socket.on('message-from-evaluator', data => {
        appendMessage(`<b>${data.name}</b>: ${data.message}`, "message-container")
    })

const temp = readJSON(story);
const data = JSON.parse(temp);
data.activities.unshift(data.firstActivity);
data.activities.push(data.lastActivity);
let activityList = [];
activityList.push(data.activities[0]);


function App2() {

    const [counter,setCounter] = React.useState(0);
    //State for holding the Chat and Help button 
    const [slideHelp, setSlideHelp] = React.useState(false);
    const [slideChat, setSlideChat] = React.useState(false);
    const [id, setID] = React.useState("");
    const [points, setPoints] = React.useState(0);
    //const [dialog, setDialog] = React.useState(true);

    const sectionRef = React.useRef();
    const helpArray = [];

        React.useEffect(() => {
            socket.on('set-id', data => {
                setID(data.id);
                getID(data.id, story, activityList[0].activityText);
            });
            
            socket.on('help-from-evaluator' , data => {
                var section = null;
                if(sectionRef.current)
                    section = sectionRef.current.getSection();
                if(data.section == section){
                    const p = document.getElementById("p" + data.nElem);
                    p.innerHTML += "<br>" + "Risposta:" + data.answer;
                }
            });
        }, []);
        
        React.useEffect(()=> {
            socket.on('add-points', data => {
                setPoints(points + parseInt(data.points));
            });
        });

        //Dizionario con key:"title" (of Activity ) value:"number"(of index Activities)       
        var dictionaryActivity =new Map;
        for(let i = 0;i<data.activities.length;i++){
            dictionaryActivity.set( data.activities[i].title , i);
        }

        var [backgroundImg,setBackgroundImg] = React.useState(0);
        React.useEffect(() => {
            document.getElementById("body2").style.height = `${window.innerHeight}px`;
            document.getElementById("body2").style.width = `${window.innerWidth}px`;
                    }, [])

   
        const navbar ={
            height: "15%"
        };

        const btnChat = getButtonChatProperty(activityList,counter,data);
        const pointStyle = getScoreProperty(data);

        const btnHelp={
            display:(activityList[counter - 1] === data.lastActivity)? 'None' : 'block',   
            border:'solid',
            fontSize:`1.2em`,
            borderColor:data.player.helpButton.frameColor,
            fontFamily:data.player.fontFamily,
            color:data.player.helpButton.backgroundColor,
            borderRadius:`${data.player.helpButton.borderRadius}px`,
            frameColor:data.player.helpButton.frameColor,
            color:data.player.helpButton.textColor,
            backgroundColor:data.player.helpButton.backgroundColor,
            textAlign:'center',
            width:`${data.player.helpButton.width *window.innerWidth /202}px`,
            height:`${data.player.helpButton.height* window.innerHeight /437}px`,
            top:`${data.player.helpButton.top * window.innerHeight/437}px`,
            left:`${data.player.helpButton.left * window.innerWidth /202}px`,
            //borderColor:data.player.chatButton.borderColor,
            position:'absolute'
    };        
    if( ( activityList[counter].backgroundImage!=="" )|| (data.player.backgroundImage !== "")){
        const path = (activityList[counter].backgroundImage!=="" )?activityList[counter].backgroundImage : data.player.backgroundImage;
        var base64data;
        axios.get(`http://localhost:8000/downloadBackground/${path}`, { responseType:"blob" })
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
            backgroundImage: 'url('+backgroundImg+')',
            backgroundPositionTop:`${data.player.image.top* window.innerHeight/437}px`,
            //backgroundPositionWidth:`${data.player.image.width* window.innerWidth/202}px`,
            backgroundSize:` ${data.player.image.width* window.innerWidth/202}px ${data.player.image.height* window.innerHeight/437}px`,
            backgroundLeft:`${data.player.image.left* window.innerHeight/437}px`,
            color :data.player.textColor,
            fontSize:data.player.sizeFont,
            fontFamily:data.player.fontFamily,
            //thicknessFrame:`${data.player.weightFont}px`,
            topFrame:`${data.player.topFrame * window.innerHeight/437}vh`,
            frameColor : data.player.frameColor,
            leftFrame:`${data.player.leftFrame* window.innerHeight/202}vh`,
            widthFrame: `${data.player.widthFrame * window.innerWidth/202}vh`,
            weightFrame:`${data.player.weightFrame* window.innerHeight/437}vh`,
            weightFont:`${data.player.weightFont}px`,
            textAlign:'center'
        };

    }else{

        var div_a = {      //style della div contenente le activity
            background: data.player.background,
            topFrame:`${data.player.topFrame* window.innerHeight/437}vh`,
            leftFrame:`${data.player.leftFrame* window.innerWidth/202}vh`,
            widthFrame: `${data.player.widthFrame* window.innerHeight/202}vh`,
            weightFont:`${data.player.weightFont}px`,
            textAlign:'center'
        };
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
        if(message != ""){
            appendMessage(`<b>You</b>: ${message}`, "message-container") //print client side 
            socket.emit('send-to-evaluator', {message: message, id})  //server side
        } 
        messageInput.value = '' //clean the input text
    } 

    const sendHelp = function (){
        const container = document.getElementById("help-message-container");
        const helpInput = document.getElementById("help-message-input");
        const message = helpInput.value;
        if(message != ""){
            helpArray.push(message);
            const length = helpArray.length;
            const helpP = document.createElement("p");
            helpP.setAttribute("id", "p" + length);
            helpP.innerHTML = "Domanda:" + message;
            container.append(helpP);
            if(sectionRef.current) {
                const section = sectionRef.current.getSection();
                socket.emit('send-help-text', {question: message, id, nElem : length, section : section})  //server side
                helpInput.value = ''} //clean the input text
            }
    } 

 
    return e(React.Fragment, null, [ 
            e("div", {key:"player",id:"player",style:div_a}, [
                e("div",{style:navbar,id:"navPlayer"},
                e("button", {id:"chat-button",variant: 'outlined', 'aria-labelledby': "label-chat",style:btnChat, onClick: ()=> {setSlideHelp(false) ; setSlideChat(!slideChat)}}, "CHAT" ), 
                e("div", {id: "points", style: pointStyle}, "Points:" + points),
                e("button", {id:"help-button", style: btnHelp, onClick: ()=> {setSlideChat(false) ; setSlideHelp(!slideHelp)}}, "AIUTO"),
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
            e(Activity, {counter:counter,setCounter:setCounter, ref: sectionRef, json:data,  v : activityList, playerId : id, dictionaryActivity : dictionaryActivity, socket: socket, points: points, setPoints: setPoints, story : "Matteo_6"}),
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






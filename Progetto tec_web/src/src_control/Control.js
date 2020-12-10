import VerticalBar from './components/VerticalBar.js';
import {CardPlayer} from './components/CardPlayer.js';
import { getDataPlayer } from './API.js';

const {Slide, Paper, IconButton, Icon, TextField, Checkbox} = MaterialUI;
const e = React.createElement;
const socket = io('http://localhost:3000', {query: 'type=evaluator'});
//const all_messages = {};


socket.emit('new-evaluator');

//function used for send messages from each card
export function send(message, id){
    socket.emit('send-to-player', {message: message, id: id});
}

//create and set cards of players
function uploadCard(dataPlayers, setSlide, cardsRef){
    const arrayOfCards = [];
    for(let key in dataPlayers){
        arrayOfCards.push( e(CardPlayer, {
        ref:(element) => cardsRef.current[key] = element, //ref used for call the child's functions
        key: key, 
        id: key, 
        name: dataPlayers[key].name, 
        timer: dataPlayers[key].timer,
        section: dataPlayers[key].section, 
        points: dataPlayers[key].points,
        setSlide: setSlide,
        }))
    }
    return arrayOfCards; 
}

export default function Control(props){
    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [slide, setSlide] = React.useState(false); 
    const [info, setInfo] = React.useState({});  //information of players
    const cardsRef = React.useRef({});  ////ref of the cards used for call the cards's functions
    let arrayOfPlayers = {};   

    //this constant is used to know what story the evaluator is in
    const story = window.location.href.replace('http://127.0.0.1:5500/?#/Home/Control/', '');

    //wait messages from players and set notify
    React.useEffect(() => {
        socket.on('message-from-player', data => {
            cardsRef.current[data.id].handleBadge();  //set notify through ref
            const message = `<b>${data.name}</b>: ${data.message}`;
            const container = data.id + '_message-container';
            appendMessage(message , container);
        });
        return () => {
            socket.off('message-from-player');
        }
    }, []);

    //get data of players
    React.useEffect(() => {
        (async () => {
            arrayOfPlayers = await getDataPlayer(story);
            setInfo(arrayOfPlayers);
        })();
    }, []);

     //create and set cards with players
     React.useEffect(() => {
        const cards = uploadCard(info, setSlide, cardsRef);
        setArrayPlayers(cards);
    }, [info])  

    return e(React.Fragment, null, [
        e(VerticalBar, null),
        e("div",null, arrayPlayers),
        e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
            e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
            e("div",{style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
            e(TextField, {variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
            e(IconButton, {children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
        ])}),
    ])
}

//mi servirebbe per ricaricare i messaggi nel caso di ricaricamento della pagina
/*const uploadMessages = function(){
    let message_app = "";
    if (props.id in all_messages){
        for (let i = 0; i < all_messages[props.id].length; i++) {
            if(all_messages[props.id].charAt(i) == "/"){
                appendMessage(message_app, props.id + "_message-container");
                message_app = "";
            }
            else
                message_app = message_app + all_messages[props.id].charAt(i);
            }
        }
}*/

//save sended message in a dictionary
    /*if (!(id in all_messages)){
        all_messages[id] = []
    }
    all_messages[id]= all_messages[id] + "You:" + message + "/";

    socket.emit('send-chat-message', {message: message, id: id}); //receiver: socket.id
   
    let dictstring = JSON.stringify(all_messages);
    let blob = new Blob(["Welcome to Websparrow.org."], { type: "json;charset=utf-8" });
    saveAs(blob, "static.json");*/


    
//save arrived message in a dictionary
/*if (!(data.id in all_messages)){
    all_messages[data.id] = []
}
all_messages[data.id]= all_messages[data.id] + data.name+":" + data.message + "/";

console.log(all_messages);*/






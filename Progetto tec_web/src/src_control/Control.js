import VerticalBar from './components/VerticalBar.js';
import BasicTable from './components/BasicTable.js';
import { CardPlayer } from './components/CardPlayer.js';
import { getDataPlayer } from './API.js';

const { Slide, Paper, IconButton, Icon, TextField, Checkbox, AppBar, Tab, Tabs } = MaterialUI;
const e = React.createElement;
const socket = io('http://localhost:3000', {query: 'type=evaluator'});
//const all_messages = {};


socket.emit('new-evaluator');

//function used for send messages from each card
export function send(message, id){
    socket.emit('send-to-player', {message: message, id: id});
}

export default function Control(props){
    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [value, setValue] = React.useState(false);
    const [slide, setSlide] = React.useState(false);
    const [data4Ranking, setData] = React.useState([]);
    const cardsRef = React.useRef({}); ////ref of the cards used for call the cards's functions
    
    //create and set cards of players
    const uploadCard = (arrayOfPlayers) => {
        const arrayOfCards = [];
        for(let key in arrayOfPlayers){
            arrayOfCards.push(e(CardPlayer, {
            ref:(element) => cardsRef.current[key] = element, //ref used for call the child's functions
            key: key, 
            id: key, 
            name: arrayOfPlayers[key].name, 
            timer: arrayOfPlayers[key].timer,
            section: arrayOfPlayers[key].section, 
            points: arrayOfPlayers[key].points,
            setSlide: setSlide,
            }))
            data4Ranking.push({id: key, points: arrayOfPlayers[key].points});
        }
        setArrayPlayers(arrayOfCards);
    }

    //this constant is used to know what story the evaluator is in
    const story = window.location.href.replace('http://localhost/MM-MisteryAtMuseum/Progetto%20tec_web/?#/Home/Control/', '');
    console.log(story);
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

    //create and set cards with players
    React.useEffect(() => {
        (async () => {
            const arrayOfPlayers = await getDataPlayer(story);
            uploadCard(arrayOfPlayers);
        })();
    }, []);
    
    return e(React.Fragment, null, [ 
        e(VerticalBar, {key: "verticalBar", value: value, setValue: setValue}),
        !value &&    e("div",{key: "arrayPlayers"}, arrayPlayers),
        !value &&   e(Slide, {key: "slide", in: slide, direction: "left", id: "slide", children: e(Paper, {key: "paperOfSlide"}, [
                e(IconButton, {key: "1", children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                e("div",{key: "2", style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                e(TextField, {key: "3", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                e(IconButton, {key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
            ])})
        ,
        value && e(BasicTable, {players: data4Ranking}),
    ]);
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






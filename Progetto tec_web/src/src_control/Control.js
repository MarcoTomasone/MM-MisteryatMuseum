import VerticalBar from './components/VerticalBar.js';
import BasicTable from './components/BasicTable.js';
import Help from './components/Help.js';
import Evaluation from './components/Evaluation.js';
import { MyDialog } from './components/MyDialog.js';
import { CardPlayer } from './components/CardPlayer.js';
import { getDataPlayer, getMessages } from './API.js';
import {appendMessage} from '../../utils.js';
const { Select, MenuItem, InputLabel, Slide, Paper, Button, IconButton, Icon, TextField, Box, Typography, Tabs, Tab, makeStyles, AppBar } = MaterialUI;
const e = React.createElement;

const socket = io('http://localhost:3000', {query: 'type=evaluator'});
socket.emit('new-evaluator');
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        e("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, ariaLabelledby: `simple-tab-${index}`, ...other }, [
            (value === index) && e(Box, { p: 3 }, [
                e("div", null, [children])
            ])
        ])
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const uploadMessages = async() => {
    (async() => {
        const arrayMessages = await getMessages();
        for(const player in arrayMessages){
            const messageContainer = document.getElementById(player + '_message-container');
            if(arrayMessages[player] && arrayMessages[player].length > 0 && messageContainer && messageContainer.childNodes.length == 0)
                arrayMessages[player].forEach((message) => {
                    appendMessage(message, player + '_message-container');
                })
        }
    })();
}

export default function Control(props){
    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [arrived, setArrived] = React.useState({}); //con anche un array di messaggi
    const [arrayHelps, setArrayHelps] = React.useState({});
    const [arrayEvaluations, setArrayEvaluations] = React.useState({});
    const [ranking, setRanking] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [ID, setID] = React.useState("");
    const cardsRef = React.useRef({}); ////ref of the cards used for call the cards's functions
    const dialogRef = React.useRef({});
    const classes = useStyles();

    uploadMessages();

    const send = (message, id) => {
        socket.emit('send-to-player', {message: message, id: id});
    }

    //create and set cards of players
    const uploadCard = (arrayOfPlayers) => {
        const arrayOfCards = [];
        const tmp = _.cloneDeep(arrived);
        for(let key in arrayOfPlayers){
            arrayOfCards.push(e(CardPlayer, {
            ref:(element) => cardsRef.current[key] = element, //ref used for call the child's functions
            key: key, 
            id: key, 
            name: arrayOfPlayers[key].name, 
            timer: arrayOfPlayers[key].timer,
            section: arrayOfPlayers[key].section, 
            points: arrayOfPlayers[key].points,
            send: send,
            arrived: arrived,
            setArrived: setArrived,
            }))
            ranking.push({id: key, points: arrayOfPlayers[key].points});
            if(!(key in tmp))
                tmp[key] = false
        }
        if(!(_.isEqual(tmp, arrived)))
            setArrived(tmp);
        setArrayPlayers(arrayOfCards);
    }

    //this constant is used to know what story the evaluator is in
    const story = window.location.href.match(/([^\/]*)\/*$/)[1];

    //wait messages from players and set notify
    React.useEffect(() => {
        socket.on('message-from-player', data => {
            const message = `<b>${data.name}</b>: ${data.message}`;
            const container = data.id + '_message-container';
            appendMessage(message , container);
            const tmp = _.cloneDeep(arrived);
            tmp[data.id] = true;
            setArrived(tmp);
        });
        socket.on('help-from-player', data => {
            const question = data.message;
            const tmp = _.cloneDeep(arrayHelps);
            if(arrayHelps[data.id])
                tmp[data.id] = [];
            tmp[data.id].push(e(Help, {id: tmp[data.id].length, player: data.id, question: question, socket: socket, arrayHelps: tmp, setArrayHelps: setArrayHelps}));
            setArrayHelps(tmp);
        });
        socket.on('answer-from-player', data => {
            const question = data.question;
            const answer = data.answer;
            const type = data.type;
            const tmp = _.cloneDeep(arrayEvaluations);
            if(arrayEvaluations[data.id])
                tmp[data.id] = [];
            tmp[data.id].push(e(Evaluation, {id: tmp[data.id].length, player: data.id, question: question, answer: answer, type: type, arrayEvaluations: tmp, setArrayEvaluations: setArrayEvaluations}));            
            setArrayEvaluations(tmp);
        });
        return () => {
            socket.off('message-from-player');
            socket.off('help-from-player');
            socket.off('answer-from-player');
        }       
    }, [ , arrived]);

    //create and set cards with players
    React.useEffect(() => {
        (async () => {
            const arrayOfPlayers = await getDataPlayer(story);
            uploadCard(arrayOfPlayers);
        })();
    }, [ , arrived]);

    //set notify of help
    React.useEffect(() => {
        for(const player in arrayHelps) {
            if(cardsRef.current[player] != null)
                if(arrayHelps[player].length <= 0)
                    cardsRef.current[player].handleHelp(true);
                else
                    cardsRef.current[player].handleHelp(false);
        }
    },[value]);

    //set notify of evaluation
    React.useEffect(() => {
        for(const player in arrayEvaluations) {
            if(cardsRef.current[player] != null)
                if(arrayEvaluations[player].length <= 0)
                    cardsRef.current[player].handleEvaluation(false);
                else
                    cardsRef.current[player].handleEvaluation(false);
        }
    },[value]);

    /*
    React.useEffect(() => {
        uploadMessages();
    }, [arrayPlayers])
    */

    const handleChange = (event, newValue) => {
        if(ID !== "")
            setID("");
        setValue(newValue);
    };

    const getPlayers = (value) => {
        const type = value === "arrayEvaluation" ? arrayEvaluations : arrayHelps;
        const players = [];
        arrayPlayers.forEach((item) => {
            players.push(e(MenuItem, {value: item.key, children: [ item.key, e(Icon, {fontSize: "small", children: "new_releases", color: "secondary", style: {marginLeft: 20, display: type[item.key] && type[item.key].length > 0 ? "hidden" : "none"}}) ]}));
        })
        return players;
    };

    return e(React.Fragment, null, [ 
        e("div", { className: classes.root }, [
            e(AppBar, { style: {border: "none"}, position: "static", children: [
                e(Tabs, { value: value, onChange: handleChange, ariaLabel: "simple-tabs", children: [
                    e(Tab, { label: "Players", ...a11yProps(0) }),
                    e(Tab, { label: "Ranking", ...a11yProps(1) }),
                    e(Tab, { label: "Help", ...a11yProps(2) }),
                    e(Tab, { label: "Evaluation", ...a11yProps(3) }),
                    e(Tab, { disabled: true, label: "Info", ...a11yProps(4) })
                ] })
            ] }),
            e(TabPanel, { value: value, index: 0, children: [
                e(Box,{key: "arrayPlayers"}, arrayPlayers)
            ] }),
            e(TabPanel, { value: value, index: 1, children: [
                e(BasicTable, {players: ranking})
            ] }),
            e(TabPanel, { value: value, index: 2, children: [
                e("label", {id: "help-label", children: "Player"}),
                e(Select, {labelId: "help-label", value: ID, style: {width: 200, marginBottom: 20, marginLeft: 20}, onChange: (event) => {setID(event.target.value)}, children: [ 
                    getPlayers("arrayHelps")
                ]}),
                (ID != "") && (arrayHelps[ID] ? arrayHelps[ID] : e("p", null, "This player doesn't need help"))
            ] }),
            e(TabPanel, { value: value, index: 3, children: [
                e("label", {id: "evaluation-label", children: "Player"}),
                e(Select, {labelId: "evaluation-label", value: ID, style: {width: 200, marginBottom: 20, marginLeft: 20}, onChange: (event) => {setID(event.target.value)}, children: [ 
                    getPlayers("arrayEvaluations")
                ]}),
                (ID != "") && (arrayEvaluations[ID] ? arrayEvaluations[ID] : e("p", null, "This player have not answer to evaluate"))
            ] }),
            e(TabPanel, { value: value, index: 4, children: [
                e("p", null, "The Info of " + ID),
                e(Button, {size: "large", variant: "contained", onClick: () => {dialogRef.current.handleOpen()}}, "Download"),
                e(MyDialog, {key: "dialog", story: story, ref: dialogRef}),
                //dialogRef.current.handleOpen();
            ] })
        ]),
        //e(VerticalBar, {key: "verticalBar", value: value, setValue: setValue}),
    ]);
}

/*---------------------------CHAT---------------*/
/*
const [messages, setMessages] = React.useState({});

in uploadCards:
    const players = tutti i giocatori;
    const tmp = {}:
    players.forEach((item) => {
        if(!(item in tmp))
            tmp[item] = {arrived: false, messages: []};
    })
    setMessages(tmp);

in socket.on(aspetto il mex):
    const tmp = _.cloneDeep(messages);
    tmp[data.id].messages.push(data.message);
    //se il collapse è chiuso mettere in true l'arrived
    tmp[data.id].arrived = true; //e passare arrived come props
    forceUpdate();
*/

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




/*------------------------TEST------------------------*/
/*
const test1 = () => {
    const tmp = _.cloneDeep(arrayHelps);
    tmp["Card0"] = [];
    tmp["Card0"].push(e(Help, {id: tmp["Card0"].length, player: "Card0", question: "Quanto lungo ?", socket: socket, arrayHelps: tmp, setArrayHelps: setArrayHelps}));
    tmp["Card0"].push(e(Help, {id: tmp["Card0"].length, player: "Card0", question: "Quanto corto ?", socket: socket, arrayHelps: tmp, setArrayHelps: setArrayHelps}));
    setArrayHelps(tmp);
}

const test2 = () => {
    const tmp = _.cloneDeep(arrayEvaluations);
    tmp["Card0"] = [];
    tmp["Card0"].push(e(Evaluation, {id: tmp["Card0"].length, player: "Card0", question: "Quanto lungo ?", answer: "Il piccione di tua madre", type:"text", arrayEvaluations: tmp, setArrayEvaluations: setArrayEvaluations}));
    tmp["Card0"].push(e(Evaluation, {id: tmp["Card0"].length, player: "Card0", question: "Quanto corto ?", answer: "https://nintendoomed.it/wp-content/uploads/2017/09/pikachu_hi_pokemon.jpg", type: "image", arrayEvaluations: tmp, setArrayEvaluations: setArrayEvaluations}));
    setArrayEvaluation(tmp);
}
*/





import VerticalBar from './components/VerticalBar.js';
import BasicTable from './components/BasicTable.js';
import { MyDialog } from './components/MyDialog.js';
import { CardPlayer } from './components/CardPlayer.js';
import { getDataPlayer } from './API.js';
import {appendMessage} from '../../utils.js';
const { Slide, Paper, Button, IconButton, Icon, TextField, Box, Typography, Tabs, Tab, makeStyles, AppBar} = MaterialUI;
const e = React.createElement;
const socket = io('http://localhost:3000', {query: 'type=evaluator'});
socket.emit('new-evaluator');

//function used for send messages from each card
export function send(message, id){
    socket.emit('send-to-player', {message: message, id: id});
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        e("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, ariaLabelledby: `simple-tab-${index}`, ...other }, [
            (value === index) && e(Box, { p: 3 }, [
                e(Typography, null, [children])
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

export default function Control(props){
    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    //const [value, setValue] = React.useState(false);
    //const [slide, setSlide] = React.useState(false);
    //const [help, setHelp] = React.useState(false);
    const [data4Ranking, setData] = React.useState([]);
    const cardsRef = React.useRef({}); ////ref of the cards used for call the cards's functions
    const dialogRef = React.useRef({});
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
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
            }))
            data4Ranking.push({id: key, points: arrayOfPlayers[key].points});
        }
        setArrayPlayers(arrayOfCards);
    }

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

    //create and set cards with players
    React.useEffect(() => {
        (async () => {
            const arrayOfPlayers = await getDataPlayer(story);
            uploadCard(arrayOfPlayers);
        })();
    }, []);
    
    return e(React.Fragment, null, [ 
        e("div", { className: classes.root }, [
            e(AppBar, { style: {border: "none"}, position: "static", children: [
                e(Tabs, { value: value, onChange: handleChange, ariaLabel: "simple tabs example", children: [
                    e(Tab, { label: "Players", ...a11yProps(0) }),
                    e(Tab, { label: "Evaluation", ...a11yProps(1) }),
                    e(Tab, { label: "Help", ...a11yProps(2) }),
                    e(Tab, { label: "Ranking", ...a11yProps(3) }),
                    e(Tab, { label: "Info", ...a11yProps(4) })
                ] })
            ] }),
            e(TabPanel, { value: value, index: 0, children: [
                e(Box,{key: "arrayPlayers"}, arrayPlayers)
            ] }),
            e(TabPanel, { value: value, index: 1, children: [
                e("div",{key: "2", style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                e(TextField, {key: "3", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                e(IconButton, {key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
            ] }),
            e(TabPanel, { value: value, index: 2, children: [
                e("div",{key: "2", style: {width: "80%", height: "40%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                e(TextField, {key: "3", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                e(IconButton, {key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
            ] }),
            e(TabPanel, { value: value, index: 3, children: [
                e(BasicTable, {players: data4Ranking})
            ] }),
            e(TabPanel, { value: value, index: 4, children: [
                e(Button, {size: "large", variant: "contained", onClick: () => {dialogRef.current.handleOpen()}}, "Download"),
                e(MyDialog, {key: "dialog", story: story, ref: dialogRef}),
                //dialogRef.current.handleOpen();
            ] })
        ]),
        /*e(VerticalBar, {key: "verticalBar", value: value, setValue: setValue}),
        e(Box,{key: "arrayPlayers"}, arrayPlayers),
        e(Slide, {key: "slide", in: slide, direction: "left", id: "slide", children: e(Paper, {key: "paperOfSlide"}, [
                e(IconButton, {key: "1", children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                e("div",{key: "2", style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                e(TextField, {key: "3", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                e(IconButton, {key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
            ])})
        ,
        e(Slide, {key: "help", in: help, direction: "bottom", id: "slide_help", children: e(Paper, {key: "paperOfHelp"}, [
            e(IconButton, {key: "1", children: e(Icon, {children: "close"}), onClick: () => {setHelp(false)}}),
            e("div",{key: "2", style: {width: "80%", height: "40%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
            e(TextField, {key: "3", variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
            e(IconButton, {key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
        ])})*/
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






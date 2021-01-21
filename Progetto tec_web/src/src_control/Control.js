import BasicTable from './components/BasicTable.js';
import Help from './components/Help.js';
import Evaluation from './components/Evaluation.js';
import { MyDialog } from './components/MyDialog.js';
import { CardPlayer } from './components/CardPlayer.js';
import { getDataPlayer, getEvaluations, getHelps, getHistory, getMessages } from './API.js';
import {appendMessage, isEnter} from '../../utils.js';
const { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Button, Dialog, DialogContent, DialogTitle, Icon, TextField, Box, Typography, Tabs, Tab, makeStyles, AppBar } = MaterialUI;
const e = React.createElement;
const socket = io('http://localhost:3000', {query: 'type=evaluator'});
socket.emit('new-evaluator');

const useStyles2 = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function createData(section, question, answer, time, points) {
    return { section, question, answer, time, points };
}

//create tab panel for the tabs
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


export default function Control(props){
    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [arrived, setArrived] = React.useState({}); //con anche un array di messaggi
    const [arrayHelps, setArrayHelps] = React.useState({});
    const [arrayEvaluations, setArrayEvaluations] = React.useState({});
    const [ranking, setRanking] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [update, setUpdate] = React.useState(0);
    const [ID, setID] = React.useState("");
    const cardsRef = React.useRef({}); //ref of the cards used for call the cards's functions
    const dialogRef = React.useRef({});
    const classes = useStyles();
    const classes2 = useStyles2();
    const story = window.location.href.match(/([^\/]*)\/*$/)[1]; //this constant is used to know what story the evaluator is in

    const send = (message, id) => {
        socket.emit('send-to-player', {message: message, id: id});
    }

    //function that create rows of the table used for get info of a player
    const createRows = (player) => {
        (async() => {
            if(player == "")
                return [];
            const data = await getHistory(player, story);
            const tmp = [];
            data.sectionArray.forEach((item) => {
                let answer = item.answer;
                //if(item.answer.startsWith('localhost'));
                //    answer = e('img', {src: item.answer});
                tmp.push(createData(item.section, item.question, answer, item.timer, item.points));
            })
            setRows(tmp);
        })();
    }

    //function that returns current players 
    const getPlayers = (value) => {
        const type = value == "arrayEvaluations" ? arrayEvaluations : arrayHelps;
        const players = [];
        arrayPlayers.forEach((item) => {
            players.push(e(MenuItem, {value: item.key, children: [ item.key, e(Icon, {fontSize: "small", children: "new_releases", color: "secondary", style: {marginLeft: 20, display: type[item.key] && type[item.key].length > 0 ? "hidden" : "none"}}) ]}));
        })
        return players;
    };

    //function to change tab
    const handleChange = (event, newValue) => {
        if(ID !== "")
            setID("");
        setValue(newValue);
        setRows([]);
    };

    //function that set timer notifications
    const notifyTimer = () => {
        arrayPlayers.forEach((player) => {
            const id = player.props.id;
            const timer = player.props.timer;
            if(cardsRef.current[id]) {
                if(timer > 60)
                    cardsRef.current[id].handleTimer("secondary");
                else
                    cardsRef.current[id].handleTimer("primary");
            }
        })
    }

    //function that set helps notifications
    const notifyHelp = () => {
        for(const player in arrayHelps) {
            if(cardsRef.current[player])
                if(arrayHelps[player].length <= 0)
                    cardsRef.current[player].handleHelp(true);
                else{
                    cardsRef.current[player].handleHelp(false);
                }
        }
    }

    //function that set evaluations notifications
    const notifyEvaluation = () => {
        for(const player in arrayEvaluations) {
            if(cardsRef.current[player])
                if(arrayEvaluations[player].length <= 0)
                    cardsRef.current[player].handleEvaluation(true);
                else
                    cardsRef.current[player].handleEvaluation(false);
        }
    }

    //upload helps in the cards
    const uploadHelp = () => {
        if(_.isEmpty(arrayHelps))
        (async() => {
            const helps = await getHelps();
            const tmp = _.cloneDeep(arrayHelps);
            for(const player in helps){
                if(!tmp[player])
                    tmp[player] = [];
                helps[player].forEach((item) => {
                    tmp[player].push(e(Help, {id: item.id, question: item.question, section: item.section, player: player, socket: socket, arrayHelps: tmp, setArrayHelps: setArrayHelps, socket: socket})); 
                })
            }
            setArrayHelps(tmp); 
        })();
    }

    //upload evaluations in the cards
    const uploadEvaluation = () => {
        console.log("in upload");
        if(_.isEmpty(arrayEvaluations))
        (async() => {
            const evaluations = await getEvaluations();
            const tmp = _.cloneDeep(arrayEvaluations);
            for(const player in evaluations){
                if(!tmp[player])
                    tmp[player] = [];
                evaluations[player].forEach((item) => {
                    tmp[player].push(e(Evaluation, {id: item.id, question: item.question, answer: item.answer, type: item.type, section: item.section, player: player, socket: socket, arrayEvaluations: tmp, setArrayEvaluations: setArrayEvaluations, story: story}));            
                })
            }
            setArrayEvaluations(tmp); 
        })(); 
    }

    //upload messages in the cards
    const uploadMessages = () => {
        (async() => {
            const arrayMessages = await getMessages();
            for(const player in arrayMessages){
                const messageContainer = document.getElementById(player + '_message-container');
                if(arrayMessages[player] && arrayMessages[player].messages.length > 0 && messageContainer && messageContainer.childNodes.length == 0) {
                    arrayMessages[player].messages.forEach((message) => {
                        appendMessage(message, player + '_message-container');
                    })
                    if(arrayMessages[player].arrived == true) {
                        const tmp = _.cloneDeep(arrived);
                        tmp[player] = true;
                        setArrived(tmp);
                    }
                }
            }
        })();
    }
    
    //create and set cards of players
    const uploadCard = (arrayOfPlayers) => {
        const arrayOfCards = [];
        const newRanking = [];
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
            socket: socket,
            send: send,
            arrived: arrived,
            setArrived: setArrived,
            }))
            newRanking.push({id: key, name: arrayOfPlayers[key].name, points: arrayOfPlayers[key].points});
            !(key in tmp) ? tmp[key] = false : null;
            if(cardsRef.current[key]) {
                if(arrayOfPlayers[key].timer > 60)
                    cardsRef.current[key].handleTimer("secondary");
                else
                    cardsRef.current[key].handleTimer("primary");
            }
        }
        !(_.isEqual(tmp, arrived)) ? setArrived(tmp) : null;
        setArrayPlayers(arrayOfCards);
        notifyHelp();
        notifyEvaluation();
        setRanking(newRanking);
    }

    //wait the messages, the helps and the answers to evaluate from players and set their notifications
    React.useEffect(() => {
        socket.on('message-from-player', data => {
            const message = `<b>${data.name}</b>: ${data.message}`;
            const container = data.id + '_message-container';
            appendMessage(message , container);
            const tmp = _.cloneDeep(arrived);
            if(cardsRef.current[data.id] && !cardsRef.current[data.id].getExpanded())
                tmp[data.id] = true; //se l'expanded è aperta
            else
                tmp[data.id] = false;
            setArrived(tmp);
        });
        socket.on('help-from-player', data => {
            const question = data.question;
            const section = data.section;
            const player = data.player;
            const id = data.id;
            const tmp = _.cloneDeep(arrayHelps);
            if(!tmp[player])
                tmp[player] = [];
            tmp[player].push(e(Help, {id, player, question, section, socket, setArrayHelps, section, arrayHelps: tmp }));
            setArrayHelps(tmp);
        });
        socket.on('answer-from-player', data => {
            console.log(data);
            const question = data.question;
            const answer = data.answer;
            const type = data.type;
            const section = data.section;
            const player = data.player;
            const id = data.id;
            const tmp = _.cloneDeep(arrayEvaluations);
            if(!tmp[player])
                tmp[player] = [];
            tmp[player].push(e(Evaluation, { id, player, question, answer, type, socket, story, section, setArrayEvaluations, arrayEvaluations: tmp }));            
            setArrayEvaluations(tmp);
        });
        socket.on('update-status', data => {
            (async () => {
                const players = await getDataPlayer(story);
                uploadCard(players);
            })();
        });
        return () => {  //componenetWillUnMount
            socket.off('message-from-player');
            socket.off('help-from-player');
            socket.off('answer-from-player');
            socket.off('update-status');
        }       
    }, [arrived, arrayEvaluations, arrayHelps]);

    //create and set cards with players
    React.useEffect(() => {
        (async () => {
            const players = await getDataPlayer(story);
            uploadCard(players);
        })();
    }, [ , arrived]);

    //set helps and evaluations notifications when the tab is switched
    React.useEffect(() => {
        notifyHelp();
        notifyEvaluation();
        notifyTimer();
    },[value, arrayHelps, arrayEvaluations]);

    React.useEffect(() => {
        uploadHelp();
        uploadEvaluation();
        uploadMessages();
    }, []);
    
    return e(React.Fragment, null, [ 
        e("div", { className: classes.root }, [
            e(AppBar, { style: {border: "none"}, position: "static", children: [
                e(Tabs, { value: value, onChange: handleChange, ariaLabel: "simple-tabs", children: [
                    e(Tab, { label: "Players", ...a11yProps(0) }),
                    e(Tab, { label: "Ranking", ...a11yProps(1) }),
                    e(Tab, { label: "Help", ...a11yProps(2) }),
                    e(Tab, { label: "Evaluation", ...a11yProps(3) }),
                    e(Tab, { label: "Info", ...a11yProps(4) })
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
                (ID != "") && (arrayHelps[ID] && arrayHelps[ID].length > 0 ? arrayHelps[ID] : e("p", null, "This player doesn't need help"))
            ] }),
            e(TabPanel, { value: value, index: 3, children: [
                e("label", {id: "evaluation-label", children: "Player"}),
                e(Select, {labelId: "evaluation-label", value: ID, style: {width: 200, marginBottom: 20, marginLeft: 20}, onChange: (event) => {setID(event.target.value)}, children: [ 
                    getPlayers("arrayEvaluations")
                ]}),
                (ID != "") && (arrayEvaluations[ID] && arrayEvaluations[ID].length > 0 ? arrayEvaluations[ID] : e("p", null, "This player have not answer to evaluate"))
            ] }),
            e(TabPanel, { value: value, index: 4, children: [
                e("label", {id: "info-label", children: "Player"}),
                e(Select, {labelId: "info-label", value: ID, style: {width: 200, marginBottom: 20, marginLeft: 20}, onChange: (event) => {setID(event.target.value); createRows(event.target.value)}, children: [ 
                    (() => {
                        const players = [];
                        arrayPlayers.forEach((item) => {
                            players.push(e(MenuItem, {value: item.key, children: [ item.key ]}));
                        })
                        return players;
                    })()
                ]}),
                e(TableContainer, {style: {marginBottom: 15}, component: Paper, children: [
                    e(Table, {className: classes2.table, ariaLabel: "simple table", children: [
                        e(TableHead, {children: [
                            e(TableRow, {children: [
                                e(TableCell, {align: "center", children: "Section"}),
                                e(TableCell, {align: "center", children: "Question"}),
                                e(TableCell, {align: "center", children: "Answer"}),
                                e(TableCell, {align: "center", children: "Time"}),
                                e(TableCell, {align: "center", children: "Points"})
                            ]}),
                        ]}),
                        e(TableBody, {children: [
                            (rows.map((row) => (
                                e(TableRow, { key: row.name, children: [
                                    e(TableCell, {align: "center", component: "th", scope: "row", children: row.section}),
                                    e(TableCell, {align: "center", component: "th", scope: "row", children: row.question}),
                                    e(TableCell, {align: "center", component: "th", scope: "row", children: row.answer}),
                                    e(TableCell, {align: "center", component: "th", scope: "row", children: row.time}),
                                    e(TableCell, {align: "center", component: "th", scope: "row", children: row.points}),
                                ]})
                            )))]})
                    ]})
                ]}),
                e(Button, {size: "large", variant: "contained", onClick: () => {dialogRef.current.handleOpen()}}, "Download"),
                e(MyDialog, {key: "dialog", story: story, ref: dialogRef}),
            ] })
        ])
    ]);
}





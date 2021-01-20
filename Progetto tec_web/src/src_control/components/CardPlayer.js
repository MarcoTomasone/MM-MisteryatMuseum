import { appendMessage, isEnter } from '../../../utils.js';
//import { send } from '../Control.js';

const { Badge, makeStyles, Paper, Grid, IconButton, Icon, TextField, Card, CardHeader, CardContent, CardActions, Avatar, Collapse } = MaterialUI;
const e = React.createElement;


/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        maxWidth: "222px",
        margin: "5px",
        float: "left",
        backgroundColor: "grey"
    },
    avatar: {
        backgroundColor: "red",
    },
  }));

const useStyles_grid = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
 }));

 const useStyles_message = makeStyles((theme) => ({
    messageContainer:{
        width: "95%",
        height: "200px",
        marginLeft: "2.5%",
        border: "1px solid grey",
        borderRadius: "5px",
        overflow: "scroll",
        fontSize: "10pt"
    },    
    messageInput:{
        width: "95%",
        marginLeft: "2.5%"
    }
    
}));

/* ------------------------------------------------------------------Component Function-------------------------------------------------------------------------------------- */
export const CardPlayer = React.forwardRef((props, ref) => {
//export default function CardPlayer(props){
    //Styles
    const classes_card = useStyles_card();
    const classes_grid = useStyles_grid();
    const classes_message = useStyles_message();

    //States
    const [expanded, setExpanded] = React.useState(false);
    const [badge, setBadge] = React.useState(true);
    const [helpBadge, setHelpBadge] = React.useState(true);
    const [evaluationBadge, setEvaluationBadge] = React.useState(true);
    const [colorTimer, setColorTimer] = React.useState("primary");

    //Function to send messages to the evaluator
    const sendMessage = (id) => {
        const messageInput = document.getElementById(id + '_message-input');
        const message = `<b>You</b>: ${messageInput.value}`;
        const container = id + "_message-container";
        appendMessage(message, container); //lato client
        props.send(messageInput.value, id)
        messageInput.value = ''
    }


    React.useImperativeHandle(ref, (value) => ({
        getExpanded(){
            return expanded;
        },
        handleHelp(value) {
		    setHelpBadge(value);
        },
        handleEvaluation(value) {
            setEvaluationBadge(value);
        },
        handleTimer(value){
            setColorTimer(value);
        }
    }));
    
    React.useEffect(() => {
        if(props.arrived[props.id] && !expanded)
                setBadge(false);
    }, [props.arrived]);

    //Function to reset the notifications counter
    React.useEffect(() => {
        if(expanded){
            props.socket.emit('read-message', { player: props.id, type: 'message' })
            const tmp = _.cloneDeep(props.arrived);
            tmp[props.id] = false;
            props.setArrived(tmp);
            setBadge(true);
        }
    }, [expanded]);

    return(
        e(Card, {key: props.id, className: classes_card.root, id: props.id, raised: true, children: [
            e(CardHeader, {key: "1", avatar: e(Avatar, {key: "avatar", children: props.name, className: classes_card.avatar}), title: props.id, subheader: "Time: " + props.timer}),
            e(CardContent, {key: "2", id: props.id + "_grid", className: classes_grid.root, children: [
                e(Grid, {key: "grid", container: true, spacing: 2, children: [
                    e(Grid, {key: "g1", item: true, xs: 6, children: e(Paper, {className: classes_grid.paper}, [ e("p", {key: "p1"}, "Section "), e("p", {key: "p2"}, props.section) ])}),
                    e(Grid, {key: "g2", item: true, xs: 6, children: e(Paper, {className: classes_grid.paper}, [ e("p", {key: "p3"}, "Points "), e("p", {key: "p4"}, props.points) ])}),
                ]})
            ]}),
            e(CardActions, {key: "3", disableSpacing: true, children: [
                e(IconButton, {style: {marginRight: 15}, key: "I1", children: e(Badge, {id: props.id  + "_chat", color: "secondary", variant: "dot", invisible: badge, children: e(Icon, {children: "chat", color: "primary"})}), onClick: () => {setExpanded(!expanded);}}),
                e(Badge, {style: {marginRight: 15}, key: "I2", id: props.id  + "_help", color: "secondary", variant: "dot", invisible: helpBadge, children: e(Icon, {children: "help", color: "primary"})}),
                e(Badge, {style: {marginRight: 15}, key: "I3", id: props.id + "_evaluation", color: "secondary", variant: "dot", invisible: evaluationBadge, children: e(Icon, {children: "perm_identity", color: "primary"})}),
                e(Icon, {key: "I4", children: "timer", color: colorTimer})
            ]}),
            e(Collapse, {key: "4", id: props.id + "_collapse", style: {widht: "300px"}, in: expanded, timeout: "auto", unmountOnExit: false, children: [
                e(CardContent, {key: "cardContent", children: [
                    e("div",{key: "div", className: classes_message.messageContainer, id: props.id + "_message-container"}), //div di arrivo delle risposte da valutare
                    e("form", {key: "form", id: props.id + "_send-container"}, [
                        e(TextField, {key: "textfield", className: classes_message.messageInput, id: props.id + "_message-input", onKeyDown: () => {isEnter(event)? sendMessage(props.id) : null} , variant: "outlined", margin: "dense", InputProps: {endAdornment: 
                            e(IconButton, {id: props.id + "_send-button", onClick: () => {sendMessage(props.id)}, size: "small", children: e(Icon, {children: "send"})}), style: {fontSize: "10pt"}}}
                        )
                    ])
                ]})
            ]})
        ]})
    )
});
import { appendMessage } from '../../utils.js'

const { Badge, makeStyles, Paper, Grid, IconButton, Icon, TextField, Card, CardHeader, CardContent, CardActions, Avatar, Collapse } = MaterialUI;
const e = React.createElement;

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        maxWidth: "222px",
        float: "left",
        margin: "5px"
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
export default function CardPlayer(props){
    //Styles
    const classes_card = useStyles_card();
    const classes_grid = useStyles_grid();
    const classes_message = useStyles_message();

    //States
    const [expanded, setExpanded] = React.useState(false);
    const [badge, setBadge] = React.useState(0);
    const [arrived, setArrived] = React.useState(false);

    //Function to send messages to the evaluator
    const sendMessage = () => {
        const messageInput = document.getElementById(props.id + '_message-input');
        const message = `<b>You</b>: ${messageInput.value}`;
        const container = props.id + "_message-container";
        appendMessage(message, container); //lato client
        props.socket.emit('send-chat-message', {message: messageInput.value, id: props.id});
        messageInput.value = ''
    }

    //Function to reset the notifications counter
    React.useEffect(() => {
        if(expanded)
            setBadge(0);
    }, [expanded]);

    //Waits for messages to arrive and set the notifications counter
    React.useEffect(() => {    
        props.socket.on('chat-message', data => {
            if(data.id == props.id){
                setArrived(true); //is used to notify the arrival of messages 
                const message = `<b>${data.name}</b>: ${data.message}`;
                const container = data.id + '_message-container';
                appendMessage(message , container);
            }   
        });
    },[props.socket]);

    //Function to set the notifications counter
    React.useEffect(() => {
        if(!expanded && arrived){
            setBadge(badge+1);
        }
        setArrived(false);
    }, [arrived])

    return(
        e(Card, {className: classes_card.root, id: props.id, raised: true, children: [
            e(CardHeader, {avatar: e(Avatar, {children: props.name, className: classes_card.avatar}), title: props.id, subheader: "Time: " + props.timer}),
            e(CardContent, {className: classes_grid.root, children: [
                e(Grid, {container: true, spacing: "2", children: [
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper}, [ e("p", null, "Section "), e("p", null, props.section) ])}),
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper}, [ e("p", null, "Points "), e("p", null, props.points) ])}),
                ]})
            ]}),
            e(CardActions, {disableSpacing: true, children: [
                e(IconButton, {children: e(Badge, {id: props.id  + "_chat", badgeContent: badge, color: "secondary", children: e(Icon, {children: "chat", color: "primary"})}), onClick: () => {setExpanded(!expanded);}}),
                e(IconButton, {children: e(Icon, {children: "help", color: "primary"})}),
                e(IconButton, {children: e(Icon, {children: "insert_photo", color: "primary"}), onClick: () =>{props.setSlide(true);}})
            ]}),
            e(Collapse, {id: props.id + "_collapse", style: {widht: "300px"}, in: expanded, timeout: "auto", unmountOnExit: false, children: [
                e(CardContent, {children: [
                    e("div",{className: classes_message.messageContainer, id: props.id + "_message-container"}), //div di arrivo delle risposte da valutare
                    e("form", {id: props.id + "_send-container"}, [
                        e(TextField, {className: classes_message.messageInput, id: props.id + "_message-input", variant: "outlined", margin: "dense", InputProps: {endAdornment: 
                            e(IconButton, {id: props.id + "_send-button", onClick: sendMessage, size: "small", children: e(Icon, {children: "send"})}), style: {fontSize: "10pt"}}}
                        )
                    ])
                ]})
            ]})
        ]})
    )
}
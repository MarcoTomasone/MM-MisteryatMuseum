import {send} from './ControlHome.js';
import {appendMessage} from '../../utils.js'

const {Badge, makeStyles, Paper, Grid, IconButton, Icon, TextField, Card, CardHeader, CardContent, CardActions, Avatar, Collapse} = MaterialUI;
const e = React.createElement;

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        maxWidth: "222px",
        float: "left",
        margin: "5px"
    },

    root2: {
        maxWidth: "150px",
        maxHeight: "100px",
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
    const classes_card = useStyles_card();
    const classes_grid = useStyles_grid();
    const classes_message = useStyles_message();

    const [expanded, setExpanded] = React.useState(false);
    
    //function to send messages to the evaluator
    const sendMessage = function (){
        const messageInput = document.getElementById(props.id + '_message-input');
        const message = messageInput.value;

        appendMessage(`<b>You</b>: ${message}`, props.id + "_message-container"); //lato client
        send(message, props.id);
        messageInput.value = ''
    }

    //function to open the chat and set the badge
    const handleExpanded = function(){
        setExpanded(!expanded);
        const collapseChatButton = document.getElementById(props.id + "_chat").childNodes[1];

        if(parseInt(collapseChatButton.innerHTML) > 0){
            collapseChatButton.innerHTML = 0;
            collapseChatButton.classList.remove("MuiBadge-visible");
            collapseChatButton.classList.add("MuiBadge-invisible");
        }
    }
        

    return(
        e(Card, {className: classes_card.root, id: props.id, raised: true, children: [
            e(CardHeader, {avatar: e(Avatar, {children: props.name, className: classes_card.avatar}), action: e(IconButton, {children: e(Icon, {children: "more_vert"})}), title: props.id, subheader: "Time: " + props.timer}),
            e(CardContent, {className: classes_grid.root, children: [
                e(Grid, {container: true, spacing: "2", children: [
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper}, [ e("p", null, "Section "), e("p", null, props.section) ])}),
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper}, [ e("p", null, "Points "), e("p", null, props.points) ])}),
                ]})
            ]}),
            e(CardActions, {disableSpacing: true, children: [
                e(IconButton, {children: e(Badge, {id: props.id  + "_chat", badgeContent: 0, color: "secondary", children: e(Icon, {children: "chat", color: "primary"})}), onClick: handleExpanded}),
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


    /*
    function appendMessage(message) {
        //const messageContainer = document.getElementById(props.id).childNodes[3].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        const messageContainer = document.getElementById('message-container')
        const messageElement = document.createElement('div')
        messageElement.innerHTML = message
        messageContainer.append(messageElement)
    

        //save sended message in a dictionary
        if (!(props.id in all_messages)){
            all_messages[props.id] = []
        }
        all_messages[props.id]= all_messages[props.id] +  "You:" + message + "/";
    }  */


    //mi servirebbe per ricaricare i messaggi nel caso di ricaricamento della pagina
    /*
    const uploadMessages = function(){
        var message_app = "";
        if (props.id in all_messages){
            for (let i = 0; i < all_messages[props.id].length; i++) {
                if(all_messages[props.id].charAt(i) == "/"){
                    appendMessage(message_app, props.id);
                    message_app = "";
                }
                else
                    message_app = message_app + all_messages[props.id].charAt(i);
            }
        }
    }
    */
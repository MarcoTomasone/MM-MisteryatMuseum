import { appendMessage } from '../../../utils.js';
import { send } from '../Control.js';

const { Badge, makeStyles, Paper, Grid, IconButton, Icon, TextField, Card, CardHeader, CardContent, CardActions, Avatar, Collapse } = MaterialUI;
const e = React.createElement;

//Function to send messages to the evaluator
const sendMessage = (id) => {
    const messageInput = document.getElementById(id + '_message-input');
    const message = `<b>You</b>: ${messageInput.value}`;
    const container = id + "_message-container";
    appendMessage(message, container); //lato client
    send(messageInput.value, id)
    messageInput.value = ''
}

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        maxWidth: "222px",
        float: "left",
        margin: "5px",
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
    const [badge, setBadge] = React.useState(0);;

    React.useImperativeHandle(ref, () => ({
		handleBadge() {
            if(!expanded)
		        setBadge(badge + 1);
		}
	}));

    //Function to send messages when you press enter
    const keyDown = (event) => {
        if (event.key == "Enter")
            sendMessage(props.id);
    }

    //Function to reset the notifications counter
    React.useEffect(() => {
        if(expanded)
            setBadge(0);
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
                e(IconButton, {key: "I1", children: e(Badge, {id: props.id  + "_chat", badgeContent: badge, color: "secondary", children: e(Icon, {children: "chat", color: "primary"})}), onClick: () => {setExpanded(!expanded);}}),
                e(IconButton, {key: "I2", children: e(Icon, {children: "help", color: "primary"})}),
                e(IconButton, {key: "I3", children: e(Icon, {children: "insert_photo", color: "primary"}), onClick: () =>{props.setSlide(true);}})
            ]}),
            e(Collapse, {key: "4", id: props.id + "_collapse", style: {widht: "300px"}, in: expanded, timeout: "auto", unmountOnExit: false, children: [
                e(CardContent, {key: "cardContent", children: [
                    e("div",{key: "div", className: classes_message.messageContainer, id: props.id + "_message-container"}), //div di arrivo delle risposte da valutare
                    e("form", {key: "form", id: props.id + "_send-container"}, [
                        e(TextField, {key: "textfield", className: classes_message.messageInput, id: props.id + "_message-input", onKeyDown: keyDown, variant: "outlined", margin: "dense", InputProps: {endAdornment: 
                            e(IconButton, {id: props.id + "_send-button", onClick: () => {sendMessage(props.id)}, size: "small", children: e(Icon, {children: "send"})}), style: {fontSize: "10pt"}}}
                        )
                    ])
                ]})
            ]})
        ]})
    )
});
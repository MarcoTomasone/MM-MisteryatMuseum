import ButtonAppBar from './components/ButtonAppBar.js';
import CardPlayer from './components/CardPlayer.js'

const {Slide, Paper, IconButton, Icon, TextField, Checkbox} = MaterialUI;
const e = React.createElement;

//const all_messages = {};
const socket = io('http://localhost:3000');

export default function controlHome(props){
    let arrayOfPlayers = [];

    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [slide, setSlide] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    //Mininimized cards with css
    React.useEffect(() => {
        if(checked == true){
            for(let i = 0; i < 10; i++){
                let card = document.getElementById("Card"+i);
                let grid = document.getElementById("Card"+i+"_grid");
                let data_time = document.getElementsByClassName("MuiCardHeader-content")[i];
                let avatar = document.getElementsByClassName("MuiCardHeader-root")[i];
                let icons = document.getElementsByClassName("MuiCardActions-root")[i];

                card.classList.add("card_minimized");
                grid.classList.add("display_minimized");
                data_time.classList.add("display_minimized");
                avatar.classList.add("recenter_avatar");
                icons.style.padding = "0px";
                icons.classList.add("recenter_icon");
            }
        }
        else{
            for(let i = 0; i < 10; i++){
                let card_min = document.getElementById("Card"+i);
                let grid_min = document.getElementById("Card"+i+"_grid");
                let data_time = document.getElementsByClassName("MuiCardHeader-content")[i];
                let avatar = document.getElementsByClassName("MuiCardHeader-root")[i];
                let icons = document.getElementsByClassName("MuiCardActions-root")[i];

                if(card_min && grid_min){
                    card_min.classList.remove("card_minimized");
                    grid_min.classList.remove("display_minimized");
                    data_time.classList.remove("display_minimized");
                    avatar.classList.remove("recenter_avatar");
                    icons.classList.remove("recenter_icon");
                    icons.style.padding = "8px";
                }
            }
        }           
    },[checked]);
    

    React.useEffect(() => {
        axios.get('http://localhost:8000/status')
            .then((response) => {
                response.data.forEach((element) => {
                    arrayOfPlayers.push(e(CardPlayer, {
                        key: element.id, 
                        id: element.id,
                        name: element.name, 
                        timer: element.timer,
                        section: element.section, 
                        points: element.points,
                        slide: slide,
                        setSlide: setSlide,
                        socket: socket
                    }))
                })
                setArrayPlayers(arrayOfPlayers);
                return arrayOfPlayers; 
            }).catch((error) => console.log(error));
    }, [])

    return e(React.Fragment, null, [
        e(ButtonAppBar, "null"),
        e("div",null, arrayPlayers),
        e(Checkbox, {checked: checked, onChange: handleChange}),
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






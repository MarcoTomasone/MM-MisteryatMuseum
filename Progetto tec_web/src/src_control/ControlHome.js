import CardPlayer from './CardPlayer.js';

const {Slide, Paper, IconButton, Icon, TextField, Slider} = MaterialUI;
const e = React.createElement;

//const all_messages = {};
const socket = io('http://localhost:3000');

export default function controlHome(props){
    let arrayOfPlayers = [];

    //States
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [slide, setSlide] = React.useState(false);
    //const [value, setValue] = React.useState(100);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /*
    React.useEffect(() => {
        if(value == 30)
            for(let i = 0; i < 2; i++){
                const card = document.getElementById("Card"+i);
                card.classList.add("test");
            }
        
        if(value == 10)
            for(let i = 0; i < 2; i++){
                const card = document.getElementById("Card"+i);
                card.classList.remove("test");
            }
            
    },[value])*/

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
        e("div",null, arrayPlayers), //arrayPlayers
        e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
            e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
            e("div",{style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
            e(TextField, {variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
            e(IconButton, {children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}})
        ])}),
        //e(Slider, {marks: true, step: 10, onChange: handleChange})
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


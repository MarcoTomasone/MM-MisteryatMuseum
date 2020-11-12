import CardPlayer from "./CardPlayer.js";
//import {setC} from "./CardPlayer.js";

const {Slide, Paper, IconButton, Icon, TextField, Slider} = MaterialUI;
const e = React.createElement;

const all_messages = {};
const socket = io('http://localhost:3000');
var count = 0;

//funzione ausiliare utilizzata per mettere i messaggi nel div
export const appendMessage = function(message, id) {
    const messageContainer = document.getElementById(id + '_message-container');
    const messageElement = document.createElement('div');

    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}

//intermezzo tra CardPlayer e il socket, usata in CardPlayer
export const send = function (message, id){
    socket.emit('send-chat-message', {message: message, receiver: socket.id, id: id})  //lato server
} 

//waiting event
socket.on('chat-message', data => {
    var today = new Date();
    count = count+1;
    appendMessage(`<b>${data.name}</b>: ${data.message} <p style="font-size:7pt; display:inline">(${today.getHours()}:${today.getMinutes()})</p>`, data.id)

    //save arrived message in a dictionary
    if (!(data.id in all_messages)){
        all_messages[data.id] = []
    }
    all_messages[data.id]= all_messages[data.id] + data.name+":" + data.message + "/";
    
    console.log(all_messages);
})


function controlHome(props){
    var arrayOfPlayers = [];

    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [slide, setSlide] = React.useState(false);
    //const [value, setValue] = React.useState(false);

    /*const handleChange = (event, newValue) => {
        setValue(newValue);
    };*/

    
    React.useEffect(() => {

        axios.get(`http://localhost:8000/status`)
            .then((response) => {
                response.data.Players.forEach((element) => {
                    arrayOfPlayers.push(e(CardPlayer, {
                        key: element.id, 
                        id: element.id,
                        name: element.name, 
                        timer: element.timer,
                        section: element.section, 
                        points: element.points,
                        chat: element.chat,
                        slide: slide,
                        setSlide: setSlide
                    }))
                })

                setArrayPlayers(arrayOfPlayers);
                return arrayOfPlayers;
            })
            .then((response) => {
                response.forEach((element) => {
                   // if(element.props.chat)
                    //  document.getElementById(element.props.id + "_chat").classList.add("MuiIcon-colorSecondary");
                })
            }).catch((error) => console.log(error));
    })

    
    /*for(let i=0; i<2; i++){
        arrayOfPlayers.push(e(CardPlayer, {id: "Card"+i, name: "C"+i, slide: slide, setSlide: setSlide})); //, slide2: slide2, setSlide2: setSlide2, setSlide3: setSlide3
    }*/

    return e(React.Fragment, null, [
                e("div",null, arrayPlayers), //arrayPlayers
                e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
                    e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                    e("div",{style: {width: "80%", height: "50%", "margin-left": "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                    e(TextField, {variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                        e(IconButton, {children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                    ),
                ])}),
                //e(Slider, {id: "slider", value: value, onChange: handleChange})
            ])

}

export default controlHome;




//in control home
/*
    function handleClickOpen() {
        //document.getElementById("btn_slide").style.display = "none";
        setSlide(true);
    }
      
    function handleClose() {
        setSlide(false);
        document.getElementById("btn_slide").style.display = "block";
    }
    */

   /* 
    React.useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?q=user:lucajett99&sort=updated`)
            .then((response) => {
                response.data.items.forEach((element) => {
                    arrayOfPlayers.push(e(Element, {
                        key: element.id, 
                        id: element.id,
                        name: element.name, 
                        section: element.section, 
                        points: element.points,
                        help: element.help,
                        humanE: element.humanE,
                        other: response.data
                    }))
                })

                setArrayPlayers(arrayOfPlayers);
                return arrayOfPlayers;
            })
            .then((response) => {
                response.forEach((element) => {
                  //  if (element.help == true) document.getElementById(arr[i].props.id).childNodes[1].childNodes[0].childNodes[1].classList.add("need_help");
                   // if (element.humanE == true) document.getElementById(arr[i].props.id).childNodes[1].childNodes[1].childNodes[1].classList.add("need_help");
                })
            }).catch((error) => console.log(error));
    })*/


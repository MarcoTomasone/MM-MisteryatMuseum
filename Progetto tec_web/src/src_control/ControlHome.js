import CardPlayer from './CardPlayer.js';
import {appendMessage} from '../../utils.js';

const {Slide, Paper, IconButton, Icon, TextField, Slider} = MaterialUI;
const e = React.createElement;

const all_messages = {};
const socket = io('http://localhost:3000');

//interlude between CardPlayer and socket, used in CardPlayer
export const send = function (message, id){
    socket.emit('send-chat-message', {message: message, id: id}); //receiver: socket.id
}


//waiting event "chat-message"
socket.on('chat-message', data => {
    var today = new Date();
    const collapseContainer = document.getElementById(data.id + "_collapse");
    const collapseChatButton = document.getElementById(data.id + "_chat").childNodes[1];
 
    appendMessage(`<b>${data.name}</b>: ${data.message} <p style="font-size:7pt; display:inline">(${today.getHours()}:${today.getMinutes()})</p>`, data.id + '_message-container')
    
    if(collapseContainer.classList.contains("MuiCollapse-hidden")){
        if(parseInt(collapseChatButton.innerHTML) == 0){
          collapseChatButton.classList.remove("MuiBadge-invisible");
          collapseChatButton.classList.add("MuiBadge-visible");
        }
        collapseChatButton.innerHTML = parseInt(collapseChatButton.innerHTML) + 1;
    }


    //save arrived message in a dictionary
    /*if (!(data.id in all_messages)){
        all_messages[data.id] = []
    }
    all_messages[data.id]= all_messages[data.id] + data.name+":" + data.message + "/";*/
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
                        setSlide: setSlide,
                    }))
                })

                setArrayPlayers(arrayOfPlayers);
                return arrayOfPlayers;
                
            }).catch((error) => console.log(error));
    })

    
    /*for(let i=0; i<2; i++){
        arrayOfPlayers.push(e(CardPlayer, {id: "Card"+i, name: "C"+i, slide: slide, setSlide: setSlide})); //, slide2: slide2, setSlide2: setSlide2, setSlide3: setSlide3
    }*/

    return e(React.Fragment, null, [
                e("div",null, arrayPlayers), //arrayPlayers
                e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
                    e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                    e("div",{style: {width: "80%", height: "50%", marginLeft: "10%", border: "1px solid grey", borderRadius: "5px"}}), //div di arrivo delle risposte da valutare
                    e(TextField, {variant: "outlined", margin: "dense", multiline: true, rows: "3", style: {width: "80%", marginLeft: "10%"}, InputProps: {endAdornment:
                        e(IconButton, {children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                    ),
                ])}),
                //e(Slider, {id: "slider", value: value, onChange: handleChange})
            ])

}

export default controlHome;



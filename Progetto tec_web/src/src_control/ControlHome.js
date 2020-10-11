const e = React.createElement;
const {Slide, Paper, IconButton, Icon, TextField} = MaterialUI;

/*
function Inner(props){
    return(
        e(Paper, null, [
        e("h1", null, "Immagine ricevuta da Mario: "),
        e("img", {src: "../../img/avatar.png"})  
        ])
    )
}
*/

function Card(props){
    const openForm = function(){
        document.getElementById(props.id).childNodes[0].style.height = "60%";
        document.getElementById(props.id).childNodes[1].style.height = "60%";
        document.getElementById(props.id).childNodes[2].style.display = "none";
        document.getElementById(props.id).childNodes[3].style.display = "block";
        document.getElementById(props.id).style.height = "300px";
        document.getElementById()
    }

    const closeForm = function(){
        document.getElementById(props.id).childNodes[3].style.display = "none";
        document.getElementById(props.id).childNodes[2].style.display = "block";
        document.getElementById(props.id).childNodes[1].style.height = "86%";
        document.getElementById(props.id).childNodes[0].style.height = "86%";
        document.getElementById(props.id).style.height = "200px";
    }

    const sendMessage = function(event){
        var socket = io();
        event.preventDefault();
        socket.emit("chatMessage", document.getElementById("msg").nodeValue());
        document.getElementById("msg").nodeValue("");
    }

    return(
        e("div",{id: props.id, className: "control_home"},[
            e("div",{id: "description_card", className: "left_div"},[
                e("div", {className: "div_card"}, [
                    e("label", null, "Name/Id:"),  //aggiungere accessibilità
                    e("p",null, props.id)
                ]), 
                e("div", {className: "div_card"}, [
                    e("label", null, "Section:"),   //aggiungere accessibilità
                    e("p",null, props.section)
                ]),
                e("div", {className: "div_card"}, [
                    e("label", null, "Points:"),    //aggiungere accessibilità
                    e("p",null, props.points)
                ])
            ]),
            e("div", {id: "led_card", className: "right_div"}, [
                e("div", {id: "help"}, [
                    e("p",{className: "led_text"}, "Help"),
                    e("span", {id: "led_help"})
                ]),
                e("div", {id: "evalutation"}, [
                    e("p",{className: "led_text"}, ["Human",e("br"),"Evaluation"]),
                    e("span", {id: "led_evalutation", onClick: () =>{
                        props.setSlide(true);
                    }})
                ]),
            ]),
            
            e("div", {id: "buttn"},[
                e("button", {type: "button", className: "open-button", onClick: openForm}, "Chat")
            ]),
            e("div", {id: "chat_card", className: "bottom_div chat-popup", id: "myForm"},[
                e("form", {action: "", className: "form-container"},[  //aggiungere l'url della parte server che manda il messaggio
                    e("h5", null, "Chat"),
                    e("ul", {id: "messages"}),
                    e("script", {src: "/socket.io/socket.io.js"}),
                    e("textarea", {placeholder: "Type message..", name: "msg", required: "required"}),

                    e("button", {type: "submit", className: "btn", onClick: sendMessage}, "Send"),
                    e("button", {type: "button", className: "btn cancel", onClick: closeForm}, "Close")
                ])
            ])
        ])
    )
}



function controlHome(props){
    var arrayOfPlayers = [];

    const [arrayPlayers, setArrayPlayers] =  React.useState([]);
    const [slide, setSlide] = React.useState(false);
    
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
                    arrayOfPlayers.push(e(Card, {
                        key: element.id, 
                        id: element.id, 
                        section: element.section, 
                        points: element.points,
                        help: element.chat,
                        humanE: element.humanE,
                        other: response.data
                    }))
                })

                setArrayPlayers(arrayOfPlayers);
                return arrayOfPlayers;
            })
            .then((response) => {
                response.forEach((element) => {
                    if (element.help == true) document.getElementById(arr[i].props.id).childNodes[1].childNodes[0].childNodes[1].classList.add("need_help");
                    if (element.humanE == true) document.getElementById(arr[i].props.id).childNodes[1].childNodes[1].childNodes[1].classList.add("need_help");
                })
            }).catch((error) => console.log(error));
    })
    */
    

    for(let i=0; i<30; i++){
        arrayOfPlayers.push(e(Card, {slide: slide, setSlide: setSlide}));
    }

    return e(React.Fragment, null, [
        e("div",null, arrayOfPlayers), //arrayPlayers
       // e("div", {id: "div_slide"}, [
            e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
                e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                e("div",{style: {width: "80%", height: "50%", "margin-left": "10%", border: "1px solid black", "border-radius": "15px"}}), //div di arrivo delle risposte da valutare
                e(TextField, {multiline: true, rows: "4", label: "Answer", defaultValue: "Default Value", variant: "outlined", margin: "dense", fullWidth: true})
            ])})
       // ])
    ])
}

export default controlHome;
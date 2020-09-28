const e = React.createElement;

function Card(props){
    const openForm = function(){
        document.getElementById(props.id).childNodes[0].style.height = "60%";
        document.getElementById(props.id).childNodes[1].style.height = "60%";
        document.getElementById(props.id).childNodes[2].style.display = "none";
        document.getElementById(props.id).childNodes[3].style.display = "block";
        document.getElementById(props.id).style.height = "300px";
    }

    const closeForm = function(){
        document.getElementById(props.id).childNodes[3].style.display = "none";
        document.getElementById(props.id).childNodes[2].style.display = "block";
        document.getElementById(props.id).childNodes[1].style.height = "86%";
        document.getElementById(props.id).childNodes[0].style.height = "86%";
        document.getElementById(props.id).style.height = "200px";
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
                    e("span", {id: "led_evalutation"})
                ]),
            ]),
            
            e("div", {id: "buttn"},[
                e("button", {type: "button", className: "open-button", onClick: openForm}, "Chat")
            ]),
            e("div", {id: "chat_card", className: "bottom_div chat-popup", id: "myForm"},[
                e("form", {action: "", className: "form-container"},[  //aggiungere l'url della parte server che manda il messaggio
                    e("h5", null, "Chat"),

                    e("textarea", {placeholder: "Type message..", name: "msg", required: "required"}),

                    e("button", {type: "submit", className: "btn"}, "Send"),
                    e("button", {type: "button", className: "btn cancel", onClick: closeForm}, "Close")
                ])
            ])
        ])
    )
}



function controlHome(props){
    var arrayOfPlayers = [];
    const [arrayPlayers, setArrayPlayers] =  React.useState([]);

    React.useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?q=user:its-hmny&sort=updated`)
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


    return e(React.Fragment, null, [e("div",null, arrayPlayers)]); 
}

export default controlHome;

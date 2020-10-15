const e = React.createElement;
const {makeStyles, Slide, Paper, Grid, IconButton, Icon, TextField, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Collapse} = MaterialUI;

function Element(props){
    const useStyles_card = makeStyles((theme) => ({
        root: {
          maxWidth: "222px",
          float: "left",
          margin: "5px"
        },
    /*    media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
        },*/
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
 
    const classes_card = useStyles_card();

    const classes_grid = useStyles_grid();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return(
        e(Card, {className: classes_card.root, raised: true, children: [
            e(CardHeader, {avatar: e(Avatar, {children: "LG", className: classes_card.avatar}), action: e(IconButton, {children: e(Icon, {children: "more_vert"})}), title: "ID PLAYER", subheader: "Date or time"}),
            e(CardContent, {className: classes_grid.root, children: [
                e(Grid, {container: true, spacing: "2", children: [
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper, xs: "6"}, [ e("p", null, "Section "), e("p", null, "2") ])}),
                    e(Grid, {item: true, xs: "6", children: e(Paper, {className: classes_grid.paper, xs: "6"}, [ e("p", null, "Points "), e("p", null, "1540") ])}),
                ]})
            ]}),
            e(CardActions, {disableSpacing: true, children: [
                e(IconButton, {children: e(Icon, {children: "chat", color: "primary"}), onClick: handleExpandClick}),
                e(IconButton, {children: e(Icon, {children: "help", color: "primary"})}),
                e(IconButton, {children: e(Icon, {children: "insert_photo", color: "secondary"}), onClick: () =>{
                    props.setSlide(true);
                } })
            ]}),
            e(Collapse, {style: {widht: "300px"}, in: expanded, timeout: "auto", unmountOnExit: true, children: [
                e(CardContent, {children: [
                    e("div",{id: "chat_div", style: {width: "95%", height: "200px", marginLeft: "2.5%", border: "2px solid black", "border-radius": "5px"}}), //div di arrivo delle risposte da valutare
                    e("input", {type: "text", style: {border: "2px solid black", borderRadius: "5px", width: "80%", height: "20px", marginLeft: "2.5%", display: "inline"}}),
                    e("button", {type: "submit", style: {width: "15%", height: "20px"}})
                ]})
            ]})
        ]})
    )
}

/*
function Cards(props){
    
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
                e("button", {type: "button", className: "open-button", onClick: () =>{
                    props.setSlide(true);
                }}, "Chat")
            ]),
            e("div", {id: "chat_card", className: "bottom_div chat-popup", id: "myForm"},[
                e("form", {action: "", className: "form-container"},[  //aggiungere l'url della parte server che manda il messaggio
                    e("h5", null, "Chat"),
                    e("ul", {id: "messages"}),
                    e("textarea", {placeholder: "Type message..", name: "msg", required: "required"}),
                
                //    e("button", {type: "submit", className: "btn", onClick: sendMessage}, "Send"),
                //    e("button", {type: "button", className: "btn cancel"}, "Close")
                
                ])
            ])
        ])
    )
}
*/



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
        //arrayOfPlayers.push(e(Cards, {slide: slide, setSlide: setSlide}));
        arrayOfPlayers.push(e(Element, {slide: slide, setSlide: setSlide}));
    }

    return e(React.Fragment, null, [
                e("div",null, arrayOfPlayers), //arrayPlayers
                e(Slide, {in: slide, direction: "left", id: "slide", children: e(Paper, null, [
                    e(IconButton, {children: e(Icon, {children: "close"}), onClick: () => {setSlide(false)}}),
                    e("div",{style: {width: "80%", height: "50%", "margin-left": "10%", border: "2px solid black", "border-radius": "15px"}}), //div di arrivo delle risposte da valutare
                    e(TextField, {style: {border: "2px solid black", borderRadius: "5px"}, multiline: true, rows: "4", variant: "outlined", margin: "dense", fullWidth: true})
                ])})
            ])

}

export default controlHome;
const e = React.createElement;
const {Icon, IconButton, Collapse, TextField, CardContent}  = MaterialUI;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function App2() {

    React.useEffect(() => {
        document.getElementById("body2").style.height = `${screen.availHeight}px`;
        document.getElementById("body2").style.width = `${screen.availWidth}px`;
                }, [])

    function readJSON(file) {
        let request = new XMLHttpRequest();
        request.open('GET', file, false);
        request.send(null);
        if (request.status == 200)
            return request.responseText;
    }

    const temp = readJSON('./Document.json');
    const data = JSON.parse(temp);

    let activityList = [];
    activityList.push(data.accessibility.activities[0]);
    
    //console.log(data.accessibility.player.thicknessFrame );

    //nei campi style ricordati di sostituire 'px' inoltre da sistemare graficamente
    //tecnica substring()

    const player= {
        //overflow:'hidden',
        height:'100%',
        width:'100%',
        //backgroundColor: 'green'
        background:  data.accessibility.player.background ,

        thicknessFrame:`${data.accessibility.player.weightFont}px`,
        topFrame:`${data.accessibility.player.topFrame}px`,
        weightFont:`${data.accessibility.player.weightFont}px`,
        widthFrame: `${data.accessibility.player.widthFrame}px`
    };

  //  console.log(data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) );
    const btnChat={
        backgroundColor:data.accessibility.player.chatButton.backgroundColor,
        borderRadius:`${data.accessibility.player.chatButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.chatButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.chatButton.top * screen.availHeight/437}px`,
        left:`${data.accessibility.player.chatButton.left * screen.availWidth /202}px`,
        //borderColor:data.accessibility.player.chatButton.borderColor,
        position:'absolute'
        /*textColor: ''+data.accessibility.player.chatButton.textColor+'',
        position:'relative' */
    };

    const btnHelp={
        backgroundColor:data.accessibility.player.helpButton.backgroundColor,
        //borderColor:data.accessibility.player.borderColor,
        borderRadius:`${data.accessibility.player.helpButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.helpButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.helpButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.helpButton.top * screen.availHeight /437}px`,
        left:`${data.accessibility.player.helpButton.left * screen.availWidth /202}px`,
        position:'absolute'
        /*       backgroundColor:''+data.accessibility.player.helpButton.backgroundColor+'',
               borderColor:''+data.accessibility.player.helpButton.borderColor+'',
               borderRadius:''+data.accessibility.player.helpButton.borderRadius+'',
               height:''+data.accessibility.player.helpButton.height+'',
               right:''+data.accessibility.player.helpButton.left+'',
               textColor: ''+data.accessibility.player.helpButton.textColor+'',
               top:''+data.accessibility.player.helpButton.top+'',
               width:''+data.accessibility.player.helpButton.width+'',
               position:'relative'
          */
    };

    const navbar ={
        //padding:'5px',
       // height:'90%',
    };

    //boolean for the chat
    const [expanded, setExpanded] = React.useState(false);

    //Function to open and close the chat
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    //chat
    const socket = io('http://localhost:3000')

    //waiting event
    socket.on('chat-message', data => {
        appendMessage(`<b>${data.name}</b>: ${data.message}`)
    })

    const sendMessage = function (){
        const messageInput = document.getElementById("message-input")
        //const messageInput = document.getElementById('message-input').value
        //console.log(document.getElementById(props.id).childNodes[3].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0])
        const message = messageInput.value
        appendMessage(`<b>You</b>: ${message}`) //lato client
        socket.emit('send-chat-message', {message: message, receiver: socket.id})  //lato server
        messageInput.value = ''
    }   

    function appendMessage(message) {
        const messageContainer = document.getElementById("message-container")
        //const messageContainer = document.getElementById('message-container')

        const messageElement = document.createElement('div')
        messageElement.innerHTML = message
        messageContainer.append(messageElement)
    }

    return e(React.Fragment, null, [

       e("div", {key:"player",id:"player",style:player}, [
           e("nav",{style:navbar,id:"navPlayer"},
           // e("button", {key:"buttonChat",id: "chatButton1",style:btnChat}, "CHAT"),
           e(IconButton, {children: e(Icon, {children: "chat", color: "primary"}), onClick: handleExpandClick}), 
           //e("button", {key:"buttonHelp",id: "helpButton1",style:btnHelp}, "HELP")),
           e(IconButton, {children: e(Icon, {children: "help", color: "primary"})}),
           e(Activity, { json:data,  v : activityList })
       )]),
        e(Collapse, {style: {widht: "300px"}, in: expanded, timeout: "auto", unmountOnExit: true, children: [
            e("div", {children: [
                e("div",{id: "message-container", style: {width: "95%", height: "200px", marginLeft: "2.5%", border: "1px solid grey", borderRadius: "5px", overflow: "scroll", fontSize: "10pt"}}), //div di arrivo delle risposte da valutare
                e("form", {id: "send-container"}, [
                    e(TextField, {id: "message-input", variant: "outlined", margin: "dense", style: {width: "95%", marginLeft: "2.5%"}, InputProps: {endAdornment: 
                        e(IconButton, {id: "send-button", onClick: sendMessage, size: "small", children: e(Icon, {children: "send"})}), style: {fontSize: "10pt"}}}
                    )
                ])
            ]})
        ]})
    ])
    }


    function Activity(props) {
   
    const [counter,setCounter] = React.useState(0);

    function inc(){
    
        if(counter + 1 === props.v.length)
            props.v.push(props.json.accessibility.activities[counter + 2 % props.json.accessibility.activities.length]);
       

            setCounter(counter+ 1);
            imgProp = [];


        //console.log(props.v);
        if(props.v[counter - 1].type_ === "button"){
            for(let i = 0; i < props.v[counter - 1].answer.length; i++)
                document.getElementById("btn"+i).style.backgroundColor="white";
        }    
        
        console.log(props.v);
    }

    const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
        borderColor:props.json.accessibility.activityStyle.btnNext.borderColor,
        backgroundColor:props.json.accessibility.activityStyle.btnNext.backgroundColor,
        borderRadius:`${props.json.accessibility.activityStyle.btnNext.borderRadius}px`,
        //width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        width:"70%",
        height:`${props.json.accessibility.activityStyle.btnNext.borderRadius * screen.availHeight /202}px`,
        position:'absolute',
        bottom:`${props.json.accessibility.activityStyle.btnNext.bottom * screen.availHeight/437}px`,
        left:`${props.json.accessibility.activityStyle.btnNext.left* screen.availWidth /202}px`,
       textColor:props.json.accessibility.activityStyle.btnNext.textColor

    }

    const textStyle = {             //implementiamo uno stile di testo unico per tutte le Storie di un attivita'
            fontSize:"20px",
            textAlign:"center",
            fontFamily:"Helvetica"
    }

        const divActivity = {      //style della div contenente le activity
        border:props.json.accessibility.activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: props.json.accessibility.activityStyle.divisor.borderColor,
       left:`${props.json.accessibility.activityStyle.divisor.left* screen.availWidth /202}px`,
       width:`${props.json.accessibility.activityStyle.divisor.width *screen.availWidth /437}px`,
       height:`${props.json.accessibility.activityStyle.divisor.height * screen.availHeight /202}px`,
       top:`${props.json.accessibility.activityStyle.divisor.top * screen.availHeight /437}px`,
       // marginBottom:"20%",
        position:'absolute',
      
    };

    const askNav = {
        border: "solid",
        borderColor: "red",
        marginTop:"20%",
    };

    let intro = 0;
    
        
    let imgProp = [];
    let mediaStyle;

    if(props.v[counter].media !== 0){
        mediaStyle = {
            width:`${props.v[counter].styleM.width  *screen.availWidth /202}px`,
            height:`${props.v[counter].styleM.height  *screen.availHeight /437}px`,
            bottom:`${props.v[counter].styleM.bottom  *screen.availWidth /437}px`,
        	left:`${props.v[counter].styleM.left  *screen.availHeight /202}px`,
            position:'absolute'
        }
     imgProp.push (e(props.v[counter].media,{style:mediaStyle,alt:props.v[counter].alternativeText,src:props.v[counter].source,autoplay:"true"}));
       
    }

    if (props.v[counter].type_ === "description" ){
        if (counter <= 0 )
            intro++;  
            
       return e("div",null,
                    e("div", {key: "activitIntro",id:"activitIntro", style: divActivity}, props.v[counter].question,
               imgProp
               )
               ,e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"));

    } else {

       let domanda = props.v[counter].question;
       let answer = props.v[counter].answer;



        if(props.v[counter].type_ === "button") {

            const buttProp = {
                width:props.v[counter].btnStyle.width,
                height:props.v[counter].btnStyle.height,
                marginLeft: props.v[counter].btnStyle.marginLeft,
                marginRight:props.v[counter].btnStyle.marginRight
            };

            const ListButtonAnswer = [];
            for (let i = 0; i < answer.length; i++) {       //Ogni Domanda puo avere n risposte diverse
                ListButtonAnswer.push(e("button", {
                    style: buttProp,
                    id:"btn"+i,
                    alt:"bottone 1: "+answer[i],
                    onClick: () => checkButton(counter - intro , i, props.json.accessibility.activities,props.v)
                }, answer[i]));
            }

            return e("div",null,
                        e("div", {key: "actDescription", style: divActivity},
                        e("p", {style:textStyle}, domanda),
                        e("div", {
                            key: "buttonblock",
                            style: askNav }, [
                            ListButtonAnswer
                        ]),
                        imgProp)
                        ,e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"));

        }else {        
            
            return e("div",null,
            
                e("div", {key: "actDescription", style: divActivity},
                    e("p", null, domanda),
                    e("div", null, [
                        e("input",{
                            type:"text",
                            id:"textAnswer",
                            onClick: () => checkButton(counter - intro , -1, props.json.accessibility.activities)
                        })
                    ]),
                    imgProp),e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"));

        }
    }

}


//0 3 ==> errore
function checkButton(activity , answer ,json,v){


    if(answer === -1){

        if(document.getElementById("textAnswer").value  === json[activity].correct){
            console.log("Risposta Corretta!");
            v.push(json[activity + 1 % json.length]);
            console.log("TextInsert Correct");
            
        }else{
            console.log("Risposta Errata!");
            v.push(json[activity + 1 % json.length]);
            console.log("TextInsert Wrong");
        }
        console.log(v);
    }else if(answer === v[v.length - 1].correct){

        console.log("Risposta Corretta");
        console.log(v);
        document.getElementById("btn"+answer).style.backgroundColor = "green";
        v.push(json[json[activity].correctAnswerGo]);
       }else{
        console.log("Risposta Errata");
        console.log(v);
       document.getElementById("btn"+answer).style.backgroundColor = "red";
       v.push(json[json[activity].wrongAnswerGo]);
   }
}


export default App2;






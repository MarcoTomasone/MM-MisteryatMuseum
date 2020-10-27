
const e = React.createElement;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



function App2() {
    const [counter,setCounter] = React.useState(0);

    React.useEffect(() => {
        console.log(screen.availHeight)
        document.getElementById("body2").style.height = `${screen.availHeight}px`;
        document.getElementById("body2").style.width = `${screen.availWidth}px`;
    }, [])

    function inc(){
        setCounter(counter+ 1);

        document.getElementById("btn0").style.backgroundColor="white";
        document.getElementById("btn1").style.backgroundColor="white";
        document.getElementById("btn2").style.backgroundColor="white";
        document.getElementById("btn3").style.backgroundColor="white";
    }
      function readJSON(file) {
        let request = new XMLHttpRequest();
        request.open('GET', file, false);
        request.send(null);
        if (request.status == 200)
            return request.responseText;
    }

    const temp = readJSON('./Document.json');
    const data = JSON.parse(temp);
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
        /*   
        textColor: ''+data.accessibility.player.chatButton.textColor+'',
        
        position:'relative'
    */
    };

    const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
        backgroundColor:data.accessibility.player.chatButton.backgroundColor,
        borderRadius:`${data.accessibility.player.chatButton.borderRadius}px`,
        width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.chatButton.borderRadius * screen.availHeight /202}px`,
        position:'absolute',
        bottom:'60px',
        left:'150px'

    }
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
    return e(React.Fragment, null, [

       e("div", {key:"player",id:"player",style:player}, [
           e("nav",{style:navbar,id:"navPlayer"},
            e("button", {key:"buttonChat",id: "chatButton1",style:btnChat}, "CHAT"),
            e("button", {key:"buttonHelp",id: "helpButton1",style:btnHelp}, "HELP"),

           e(Activity, {
               json:data,
               c:counter
            }),
               e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"),
           )])
    ]);

}


function Activity(props) {
    const introBorder = {      //style della div contenente le activity
        border: "solid",
        borderColor: "black",
 
       left:"50px",
       top:"100px",
       width:"80%",
        height:"65%",
        marginBottom:"20%",
        position:'absolute'
    };

    const askNav = {
        border: "solid",
        borderColor: "red",
        marginTop:"20%",
    };

    const divActivity = introBorder;

    const buttProp = {
        width:"30%",
        height:"15%",
        marginLeft: "10%",
        marginRight: "10%"
    };

    let intro = 0;
    if (props.json.accessibility.activities[props.c ].type_ === "description" ){
        if (props.c <= 0 || props.c > props.json.accessibility.activities.length)
            intro++;
        return e("div", {key: "activitIntro",id:"activitIntro", style: introBorder}, props.json.accessibility.activities[props.c].question);

    } else {

       let domanda = props.json.accessibility.activities[props.c].question;
       let answer = props.json.accessibility.activities[props.c ].answer;



        if(props.json.accessibility.activities[props.c].type_ === "button") {
            const ListButtonAnswer = [];
            for (let i = 0; i < answer.length; i++) {       //Ogni Domanda puo avere n risposte diverse
                ListButtonAnswer.push(e("button", {
                    style: buttProp,
                    id:"btn"+i,
                    onClick: () => checkButton(props.c - intro , i, props.json.accessibility.activities)
                }, answer[i]));
            }


            return e("div", {key: "actDescription", style: divActivity},
                e("p", null, domanda),
                e("div", {
                    key: "buttonblock",
                    style: askNav }, [
                    ListButtonAnswer
                ]));

        }else {             //if(props.json.accessibility.activities[props.c].type === "text"){
            return e("div", {key: "actDescription", style: divActivity},
                e("p", null, domanda),
                e("div", null, [
                    e("input",{
                        type:"text",
                        id:"textAnswer",
                        onClick: () => checkButton(props.c - intro , -1, props.json.accessibility.activities)
                    })
                ]));

        }
    }

}


//0 3 ==> errore
function checkButton(activity , answer ,json){


    if(answer === -1){

        if(document.getElementById("textAnswer").value  === json[activity].correct){
            console.log("Risposta Corretta!");
        }else{
            console.log("Risposta Errata!");
        }
    }else if(answer === json[activity].correct){

        console.log("Risposta Corretta");
        document.getElementById("btn"+answer).style.backgroundColor = "green";
       }else{
        console.log("Risposta Errata");
       document.getElementById("btn"+answer).style.backgroundColor = "red";
   }
}


export default App2;






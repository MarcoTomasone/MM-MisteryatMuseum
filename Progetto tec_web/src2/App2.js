
const e = React.createElement;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



function App2() {
    const [counter,setCounter] = React.useState(0);

    function inc(){
        setCounter(counter+ 1);
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
        overflow:'hidden',
        height:'667px',
        width:'375px',
        backgroundColor: 'green'
       /* background: '' + '#' + data.accessibility.player.background + '',

        thicknessFrame: '' +  data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) + '',
        topFrame: '' + data.accessibility.player.topFrame + '',
        weightFont: '' + data.accessibility.player.weightFont + '',
        widthFrame: '' + data.accessibility.player.widthFrame + ''
    */
    };


  //  console.log(data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) );
    const btnChat={
        backgroundColor:'red',
        borderRadius:'20px',
        textAlign:'center',
        width:'30%',
        height:'7%'
     /*   backgroundColor:''+data.accessibility.player.chatButton.backgroundColor+'',
        borderColor:''+data.accessibility.player.chatButton.borderColor+'',
        borderRadius:''+data.accessibility.player.chatButton.borderRadius+'',
        height:''+data.accessibility.player.chatButton.height+'',
        left:''+data.accessibility.player.chatButton.left+'',
        textColor: ''+data.accessibility.player.chatButton.textColor+'',
        top:''+data.accessibility.player.chatButton.top+'',
        width:''+data.accessibility.player.chatButton.width+'',
        position:'relative'
    */
    };

    const btnHelp={
        width:'30%',
        height:'7%',
        backgroundColor:'red',
        borderRadius:'20px',
        textAlign:'center',

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

    const descr={

       // colorFrame:''+data.accessibility.player.colorFrame+'',
      //  fontFamily:''+data.accessibility.player.fontFamily+''
    };


    const navbar ={
        //padding:'5px',
       // height:'90%',

    };
    return e(React.Fragment, null, [

       e("div", {key:"player",style:player}, [
           e("nav",{style:navbar},
            e("button", {id: "chatButton1",style:btnChat}, "CHAT"),
            e("button", {id: "helpButton1",style:btnHelp},/*component:() => e(Activity ,{data: data.accessibility}) },*/ "HELP"),

           e(Activity, {json:data,c:counter,btn : btnChat}),
               e("button", {id: "nextButton1",style:btnChat,onClick:inc}, "NEXT"),
           )])
    ]);

}


function Activity(props) {
    const introBorder = {      //style della div contenente le activity
        border: "solid",
        borderColor: "black",
       // padding: "2px black"
        width:"80%",
        height:"55%",
        marginBottom:"20%"
    }


    //console.log(props.json.accessibility.title);
   // console.log(props.c);                           //counter della classe App

    const askNav = {
        border: "solid",
        borderColor: "red",
        marginTop:"20%",
    }

    const divActivity ={
        height:"55%",
        width:"80%",
        border: "solid",
        borderColor: "blue",
        marginBottom:"20%",
        //marginLeft:"5%",
        //marginRight:"5%"
    }

    const buttProp = {
        width:"30%",
        height:"15%",
        marginLeft: "10%",
        marginRight: "10%"
    }
    // console.log(counter);
    if (props.c <= 0 || props.c > props.json.accessibility.activities.length) {
        let exampleText;
        if (props.c > 0)
            exampleText = "Fine Attivita";
        else
            exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

        return e("div", {key: "activitIntro", style: introBorder}, exampleText);
    } else {
        //        document.getElementById("nextButton1").hidden;

        let numberOfActivities = props.json.accessibility.activities.length;
        let domanda = props.json.accessibility.activities[props.c - 1].question;
        let answer = props.json.accessibility.activities[props.c - 1].answer;


console.log("c = "+props.c);
if(props.json.accessibility.activities[props.c - 1].type_answer === "button") {
    const ListButtonAnswer = [];
    for (let i = 0; i < answer.length; i++) {       //Ogni Domanda puo avere n risposte diverse
        ListButtonAnswer.push(e("button", {
            style: buttProp,
            onClick: () => checkButton(props.c - 1, i, props.json.accessibility.activities)
        }, answer[i]));
    }


    return e("div", {key: "actDescription", style: divActivity},
        e("p", null, domanda),
        e("div", {key: "buttonblock", style: askNav}, [
            ListButtonAnswer
        ]));

}else {             //if(props.json.accessibility.activities[props.c].type === "text"){
    return e("div", {key: "actDescription", style: divActivity},
        e("p", null, domanda),
        e("div", null, [
            e("input",{type:"text"})
        ]));

}
        /*      NUMERO RISPOSTE FISSATO
        return e("div", {key: "actDescription"},
            e("p",null,domanda),
            e("div", {key:"buttonblock",style:askNav},[
                e("button", null, answer[0]),
                e("button", null, answer[1]),
                e("button", null, answer[2])
            ]));
  */


    }

}


//0 3 ==> errore
function checkButton(activity , answer ,json){
   if(answer === json[activity].correct){
        console.log("Risposta Corretta");
       }else{
       //window.alert("Risposta Errata!");
        console.log("Risposta Errata!");
   }
}


export default App2;






const e = React.createElement;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



function App2() {
    const [counter,setCounter] = React.useState(0);

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
    };

    const askNav = {
        border: "solid",
        borderColor: "red",
        marginTop:"20%",
    };

    const divActivity ={
        height:"55%",
        width:"80%",
        border: "solid",
        borderColor: "blue",
        marginBottom:"20%",
        //marginLeft:"5%",
        //marginRight:"5%"
    };

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
        return e("div", {key: "activitIntro", style: introBorder}, props.json.accessibility.activities[props.c].question);

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





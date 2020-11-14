import ButtonType from './ButtonType.js';
import inputType from './InputType.js';

const e = React.createElement;

function loadHelpMessage(props, counter){
    //Charge The help message
    const messageContainer = document.getElementById("help-message-container")
    messageContainer.innerHTML = ""
    var message = props.json.accessibility.activities[counter].help
    message = (message == null) ?  "Non ci sono aiuti per questa activity!" : message
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement) 

}
function Activity(props) {

        const [counter,setCounter] = React.useState(0);

        function inc(){    
            loadHelpMessage(props, counter);
            setCounter(counter+ 1);
            MediaProp = [];
           // inputProp = [];
            if(counter  === props.v.length - 1){
              // console.log(props.json.accessibility.);
                props.v.push(props.json.accessibility.activities[props.json.accessibility.activities.length - 1]);
                document.getElementById("nextButton").style.backgroundColor="grey";
            }
            if(props.v[counter].type_ === "button" && counter > 0){
                for(let i = 0; i < props.v[counter].answer.length; i++)
                    document.getElementById("btn"+i).style.backgroundColor=props.v[counter].btnStyle.bckgrndClr;
            } 
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
    
       
        const askNav = {
            border: "solid",
            borderColor: "red",
            marginTop:"20%",
        };

        const divActivity = {      //style della div contenente le activity
            border:props.json.accessibility.activityStyle.divisor.border,
            overflow:"scroll",
            borderColor: props.json.accessibility.activityStyle.divisor.borderColor,
            left:`${props.json.accessibility.activityStyle.divisor.left* screen.availWidth /202}px`,
            width:`${props.json.accessibility.activityStyle.divisor.width *screen.availWidth /437}px`,
            height:`${props.json.accessibility.activityStyle.divisor.height * screen.availHeight /202}px`,
            top:`${props.json.accessibility.activityStyle.divisor.top * screen.availHeight /437}px`,
            position:'absolute',
          
        };
         //  console.log(data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) );
        let MediaProp = [];
        let mediaStyle;
                
        if(props.v[counter].media !== 0){
            mediaStyle = {
                width:`${props.v[counter].styleM.width  *screen.availWidth /202}px`,
                height:`${props.v[counter].styleM.height  *screen.availHeight /437}px`,
                bottom:`${props.v[counter].styleM.bottom  *screen.availHeight /437}px`,
                left:`${props.v[counter].styleM.left  *screen.availWidth /202}px`,
                position:'absolute'
            }
         MediaProp.push (e(props.v[counter].media,{style:mediaStyle,alt:props.v[counter].alternativeText,src:props.v[counter].source,controls:true,autoPlay:true}));
        }
        if (props.v[counter].type_ === "description" ){
             return e("div",null,
                        e("div", {key: "activitIntro", id:"activitIntro", style: divActivity}, props.v[counter].question, MediaProp ),
                        e("button", {key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "NEXT"));
        } else {
            let domanda = props.v[counter].question;
            let answer = props.v[counter].answer;
    
            if(props.v[counter].type_ === "button") {
                return e(ButtonType, {answer:answer, askNav:askNav, textStyle:textStyle, domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
            }else {
                return e(inputType, { domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
        }
    }
}
    


    function checkButton(counter, answer, json, v){
        if(!(counter === json.length -1) ){
        if(answer === -1){
            if(document.getElementById("textAnswer").value  ===v[counter].correct ){
                let appo = v[counter + 1];
                v[counter+1] = json[v[counter].correctAnswerGo];
                v.push(appo);
                console.log(appo);
                console.log("TextInsert Correct");
            }
            else {
                let appo = v[counter + 1];
                v[counter+1] = json[v[counter].wrongAnswerGo];
                v.push(appo);
                console.log("TextInsert Wrong");
            }
            console.log(v);
        }
        else if(answer === -2) {
            alert(document.getElementById("rangenpt").value); 
        }
        else if(answer === v[counter].correct){
            console.log("Risposta Corretta");
            document.getElementById("btn"+answer).style.backgroundColor = v[counter].btnStyle.bckgrndClrC;
            let appo = v[counter + 1];
            v[counter+1] = json[v[counter].correctAnswerGo];
            v.push(appo);
        }
        else {
            console.log("Risposta Errata");
            document.getElementById("btn"+answer).style.backgroundColor =  v[counter].btnStyle.bckgrndClrW;
            let appo = v[counter + 1];
            v[counter+1] = json[v[counter].wrongAnswerGo];
            v.push(appo);
        }
    }
}

export default Activity;
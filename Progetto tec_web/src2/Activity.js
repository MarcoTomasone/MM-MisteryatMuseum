import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import {appendMessage} from '../utils.js';
const e = React.createElement;

function loadHelpMessage(props, counter){
    const messageContainer = document.getElementById("help-message-container");
    messageContainer.innerHTML = "";
    var message = props.v[counter].help;
    message = (message == null) ?  "Non ci sono aiuti per questa activity!" : message;
    appendMessage(message, "help-message-container");
}
function Activity(props) {

        const [counter,setCounter] = React.useState(0);
        
        
        function inc(){    
            
        
            setCounter(counter+ 1);
            loadHelpMessage(props, counter +1);
            
            MediaProp = [];
            console.log(counter);
        
            if(counter === props.v.length - 2 || props.v[counter + 1] === undefined){
                if(counter === props.v.length - 2)
                    console.log("last activities");
                else 
                    console.log("undefined term");
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
         MediaProp.push (e(props.v[counter].media,{style:mediaStyle,key:"media",alt:props.v[counter].alternativeText,src:props.v[counter].source,controls:true,autoPlay:true}));
        }
           
        if (props.v[counter].type_ === "description" ){
             return e("div",{key:"divCont"},
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
        
        if(answer === -1){
            if(document.getElementById("textAnswer").value  ===v[counter].correct ){
            /*    let appo = v[counter + 1];
                v[counter+1] = json[v[counter].correctAnswerGo];
                v.push(appo);*/
                getActivity(1,v,counter,json);
                console.log("TextInsert Correct");
            }
            else {/*
                let appo = v[counter + 1];
                v[counter+1] = json[v[counter].wrongAnswerGo];
                v.push(appo);*/
                getActivity(0,v,counter,json);
                console.log("TextInsert Wrong");
            }
            console.log(v);
        }
        else if(answer === -2) {
            let value =document.getElementById("rangenpt").value; 
            alert(value); 
            if(value > 5){
                getActivity(1,v,counter,json);
            }
        }
        else if(answer === v[counter].correct){
            console.log("Risposta Corretta");
            document.getElementById("btn"+answer).style.backgroundColor = v[counter].btnStyle.bckgrndClrC;
            getActivity(1,v,counter,json);
            /*  let appo = v[counter + 1];
         //TEST
            let correctWay= v[counter].correctAnswerGo;
            let length = correctWay.length;
            let index = getRandomInt(0,length- 1);
            v[counter+1] = json[correctWay[index]];
            v.push(appo);
           /* console.log(correctWay[index]);
            console.log("random:"+index);
            console.log(v[counter+1]);*/
        }
        else {
            getActivity(0,v,counter,json);
            console.log("Risposta Errata");
            document.getElementById("btn"+answer).style.backgroundColor =  v[counter].btnStyle.bckgrndClrW;
           /* let appo = v[counter + 1];
     
            //TEST
            let errorWay= v[counter].wrongAnswerGo;
            let length = errorWay.length;
            let index = getRandomInt(0,length- 1);
            v[counter+1] = json[errorWay[index]];
            v.push(appo);

            
             console.log(errorWay[index]);
            console.log("random:"+index);
            console.log(v[counter+1]);
        */
        }
  
}

function getActivity(correct,v,counter,json){
    if(correct === 1){      //fare in modo che le ultime attivita accettino la risposta ma non aggiungano nuove attivita
            let appo = v[counter + 1];
            //TEST
           let correctWay= v[counter].correctAnswerGo;
           let length = correctWay.length;
           let index = getRandomInt(0,length- 1);
           v[counter+1] = json[correctWay[index]];
           
      //  console.log("next P ");console.log(v[counter+1]);
      //  console.log(v);

           v.push(appo);
        //   console.log(correctWay[index]);
        //   console.log("random:"+index);
        //   console.log(v[counter+1]);
    }else{
        let appo = v[counter + 1];
     
        //TEST
        let errorWay= v[counter].wrongAnswerGo;
        let length = errorWay.length;
        let index = getRandomInt(0,length- 1);
        v[counter+1] = json[errorWay[index]];
        v.push(appo);
       // console.log(errorWay[index]);
       // console.log("random:"+index);
       // console.log(v[counter+1]);
        
    }
}
function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export default Activity;
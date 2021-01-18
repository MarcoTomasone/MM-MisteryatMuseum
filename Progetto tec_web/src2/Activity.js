import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import {loadHelpMessage, getRandomInt} from '../utils.js';
import { sendData} from './dataHandler.js';
const e = React.createElement;
let timer; 
/**         Activity 
 * contains the interactive activities 
 * state[Counter]   <-- number of activity from v[] {dinamic Array}
 * v[counter + 1 ] contains the next activity
 * every element on v[i] is a copy from props.json.accessibility
 * 
 * @param{json:data,  v : activityList , playerId : playerId}
 */
function Activity(props){
    
    const [counter,setCounter] = React.useState(0);
    var [img,setImg] = React.useState(0);
    const [lastAnswer,setLastAnswer] = React.useState(null);
    const dinamicActivities = props.v;
    const activities = props.json.accessibility.activities;
    const activityStyle =  props.json.accessibility.activityStyle;
        
//lastAnswer != NULL per esigenze di Debug in fase di presentazione sono da eliminare
    function inc(){

        let actual = dinamicActivities[counter];
        let index = 0;
        let questionIndex = activities.indexOf(dinamicActivities[counter]);
        let indexOfNewActivity;
        setLastAnswer(null);
        
        clearInterval(timer);
        if(dinamicActivities[counter].widgetType !== "" && dinamicActivities[counter].widgetType !=='imgUpload' && (lastAnswer !== null || dinamicActivities[counter].widgetType =="text" || dinamicActivities[counter].widgetType =="range")){
            switch(dinamicActivities[counter].widgetType){
                case "Quattro opzioni" : 
                    sendData(props.playerId, activities[questionIndex].question,dinamicActivities[counter].multipleAnswer[lastAnswer], counter );
                    if(dinamicActivities[counter].correct === lastAnswer){
                       index = getRandomInt(0,dinamicActivities[counter].correctAnswerGo.length - 1);
                        console.log("Risposta Corretta!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.correctAnswerGo[index]);
                        dinamicActivities.push(activities[indexOfNewActivity]);
                    }else{
                        index = getRandomInt(0,dinamicActivities[counter].wrongAnswerGo.length -1);
                        console.log("Risposta Errata!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index]);
                        dinamicActivities.push(activities[indexOfNewActivity]);    
                    }
                break;
                case "Vero Falso" :
                    sendData(props.playerId, activities[questionIndex].question, dinamicActivities[counter].multipleAnswer[lastAnswer], counter );
                    if(dinamicActivities[counter].correct === lastAnswer){
                        index = getRandomInt(0,dinamicActivities[counter].correctAnswerGo.length - 1);
                        console.log("Risposta Corretta!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.correctAnswerGo[index]);
                        dinamicActivities.push(activities[indexOfNewActivity]);
                    }else{
                        index = getRandomInt(0,dinamicActivities[counter].wrongAnswerGo.length -1);
                        console.log("Risposta Errata!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index])
                        dinamicActivities.push(activities[indexOfNewActivity]);    
                    }
                break;
                case "range":
                    let value = document.getElementById("rangenpt").value; 
                    console.log(value); 
                    sendData(props.playerId, activities[questionIndex].question, value, counter );
                    if(value < dinamicActivities[counter].end && value > dinamicActivities[counter].start ){
                        index = getRandomInt(0,dinamicActivities[counter].correctAnswerGo.length - 1);
                        console.log("Risposta Corretta!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.correctAnswerGo[index])
                       
                        dinamicActivities.push(activities[indexOfNewActivity]);
                    }else{
                        index = getRandomInt(0,dinamicActivities[counter].wrongAnswerGo.length -1);
                        console.log("Risposta Errata!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index])
                        dinamicActivities.push(activities[indexOfNewActivity]);  
                    }
                break;
                case "text":
                    sendData(props.playerId, activities[questionIndex].question, document.getElementById("textAnswer").value, counter );
                    if(document.getElementById("textAnswer").value  === props.v[counter].correct){
                        index = getRandomInt(0,props.v[counter].correctAnswerGo.length-1);
                        console.log("Risposta Corretta!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index]);
                        props.v.push(activities[indexOfNewActivity]);
                    }else{
                        index = getRandomInt(0,props.v[counter].wrongAnswerGo.length -1);
                        console.log("Risposta Errata!");
                        indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index]);
                        props.v.push(activities[indexOfNewActivity]);
                    }
                break;
            }
        }else{
            if(lastAnswer === null){
                if(counter + 1 <= props.v.length){
                    dinamicActivities.push(activities[counter + 1 % activities.length]);
                } 
            }else{
                const index = activities.indexOf(dinamicActivities[counter]);
                if(index === activities.lenght - 1){
                    dinamicActivities.push(activities[activities.length -1]);
                    document.getElementById("nextButton").style.backgroundColor="grey";
                }else if(index > -1 ){
                    dinamicActivities.push(activities[index+1]);
                }else{ 
                    console.log('error');
                }
        }
                
        }
        setCounter(counter + 1);
        loadHelpMessage(props, counter);
        setLastAnswer(null);
        mediaProp = [];
        const startDate = new Date();
        questionIndex = activities.indexOf(dinamicActivities[counter + 1]);
        console.log(counter);
        timer = setInterval( () => {
            var now = new Date();
            var seconds = (now.getTime() - startDate.getTime()) / 1000;
            const answer = lastAnswer ? dinamicActivities[counter].multipleAnswer[lastAnswer] : null;
            sendData(props.playerId, 
                activities[questionIndex].question, 
                answer,
                counter + 1, 
                seconds );
        }, 5000);
    }

    function checkButton(answer){
        if(props.v[counter].widgetType ==="Vero Falso"){    
            if(answer === 1){
                document.getElementById("btnFalse").backgroundColor = props.v[counter].btnStyle.bckgrndClr; 
                document.getElementById("btnTrue").backgroundColor = "yellow"; 
            }else{
                document.getElementById("btnFalse").backgroundColor = "yellow"; 
                document.getElementById("btnTrue").backgroundColor = props.v[counter].btnStyle.bckgrndClr; 
            }
        }
        else{
            const nAnswer = props.v[counter].multipleAnswer.lenght;
            for(let i = 0 ; i < nAnswer ;i++){
                document.getElementById("btn"+i).backgroundColor = props.v[counter].btnStyle.bckgrndClr; 
            }
            document.getElementById("btn"+answer).backgroundColor="yellow";
        }
    setLastAnswer(answer);
    }

    const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
        borderColor:activityStyle.btnNext.borderColor,
        backgroundColor:activityStyle.btnNext.backgroundColor,
        borderRadius:`${activityStyle.btnNext.borderRadius}px`,
        //width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        width:"70%",
        height:`${activityStyle.btnNext.borderRadius * screen.availHeight /202}px`,
        position:'absolute',
        bottom:`${activityStyle.btnNext.bottom * screen.availHeight/437}px`,
        left:`${activityStyle.btnNext.left* screen.availWidth /202}px`,
        textColor:activityStyle.btnNext.textColor

    }
    const askNav = {
        border: "solid",
        borderColor: "red",
        marginTop:"20%",
    };
    
    const textStyle = {             //implementiamo uno stile di testo unico per tutte le Storie di un attivita'
            fontSize:"20px",
            textAlign:"center",
            fontFamily:"Helvetica"
    }

/*    const divActivity = {     //style della div contenente le activity
        border:activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: activityStyle.divisor.borderColor,
        left:`${activityStyle.divisor.left* screen.availWidth /202}px`,
        width:`${activityStyle.divisor.width *screen.availWidth /437}px`,
        height:`${activityStyle.divisor.height * screen.availHeight /202}px`,
        top:`${activityStyle.divisor.top * screen.availHeight /437}px`,
        position:'absolute',
      
    };
    */
   const divBorder = {     //style della div contenente le activity
    border:activityStyle.divisor.border,
    overflow:"scroll",
    borderColor: activityStyle.divisor.borderColor,
    left:`${activityStyle.divisor.left* screen.availWidth /202}px`,
    width:`${activityStyle.divisor.width *screen.availWidth /437}px`,
    height:`${activityStyle.divisor.height * screen.availHeight /202}px`,
    top:`${activityStyle.divisor.top * screen.availHeight /437}px`,
    position:'absolute',
  
};
   const divActivity = {     //style della div contenente le activity
        border:"solid",
        overflow:"scroll",
        borderColor:'red',
        width:`100%`,
        height:`100%`,
        //top:`${activityStyle.divisor.top * screen.availHeight /437}px`,
        position:'absolute',

    }
    let mediaProp = [];
        if(dinamicActivities[counter].media === "img"){     
        // -->  richiesta al server per il media 
        var base64data;

        axios.get(`http://localhost:8000/downloadImage/${dinamicActivities[counter].source}`, { responseType:"blob" })
                .then(function (response) {
                var blob1 = response.data;
                const blob = new Blob([blob1], { type: 'image/png' });
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function() {
                    base64data = reader.result;                
                    setImg(img = base64data);
                    }
        });       
        const mediaStyle = {
            width:`${dinamicActivities[counter].styleM.width  *screen.availWidth /202}px`,
            height:`${dinamicActivities[counter].styleM.height  *screen.availHeight /437}px`,
            bottom:`${dinamicActivities[counter].styleM.bottom  *screen.availHeight /437}px`,
            left:`${dinamicActivities[counter].styleM.left  *screen.availWidth /202}px`,
            position:'absolute'
        }
    
    if(img !== 0)
        mediaProp.push (e("img",{style:mediaStyle,key:"media",alt:dinamicActivities[counter].alternativeText,src:img}));//controls:true,autoPlay:true}));    
    }

    /**per inserire immagini dentro o fuori il divActivity é necessario spostare il vettore mediaProp
     * o come figlio di activityIntro oppure come figlio di activity e impostare i cambiamenti nel json opportuno
     */
    if (dinamicActivities[counter].widgetType === "" ){   
        return e("div",{key:"divCont"},
                e("div",{key: "activity", id:"activy", style: divActivity},    
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, dinamicActivities[counter].question , mediaProp)
                ),      
                e("button", {key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "NEXT")
        );

    } else {
        const domanda = dinamicActivities[counter].question;
        const answer = dinamicActivities[counter].multipleAnswer;

        if(dinamicActivities[counter].widgetType === "Quattro opzioni" || dinamicActivities[counter].widgetType === "Vero Falso") {
                // multiple answer || true\false
            return e("div",{key: "activity", id:"activy", style: divActivity},     
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, dinamicActivities[counter].question ,   mediaProp),
                    e(ButtonType, {answer:answer, askNav:askNav, textStyle:textStyle, domanda:domanda,lastAnswer:lastAnswer, json:props.json, counter:counter, v : dinamicActivities, checkButton : checkButton.bind(this) , btnNext:btnNext, MediaProp : mediaProp, inc:inc}
            ));
        }else { 
                //avaible Input type == 'range' || type=='text' || type=="file"
            return e("div",{key: "activity", id:"activy", style: divActivity},    
                    
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, dinamicActivities[counter].question,mediaProp),
                    e(inputType, { domanda:domanda, json:props.json, counter:counter, v : dinamicActivities , btnNext:btnNext, MediaProp : mediaProp, inc:inc}
                ));
    }
}
}


export default Activity;
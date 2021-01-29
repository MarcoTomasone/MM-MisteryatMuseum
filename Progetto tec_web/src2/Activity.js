import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import { getRandomInt} from '../utils.js';
import { sendData, postOnServer} from './dataHandler.js';

const e = React.createElement;
let timer; 
let startDate, now, seconds;

/**         Activity 
 * contains the interactive activities 
 * state[Counter]   <-- number of activity from v[] {dinamic Array}
 * v[counter + 1 ] contains the next activity
 * every element on v[i] is a copy from props.json.accessibility
 * 
 * @param{json:data,  v : activityList , playerId : playerId, socket : socket}
 */
export const Activity = React.forwardRef((props, ref) => {

    let actualPoints = 0;
    const counter = props.counter;
    const setCounter = props.setCounter;
    var   [img,setImg] = React.useState(0);
    var [backgroundImg, setBackgroundImg] = React.useState(0);
    const [lastAnswer,setLastAnswer] = React.useState(null);
    const dinamicActivities = props.v;
    const activities = props.json.activities;
    const activityStyle =  props.json.activityStyle;
    const actual = dinamicActivities[counter];

    React.useImperativeHandle(ref, (value) => ({
        getSection(){
            return counter;
        },
    }));
    
    //lastAnswer != NULL per esigenze di Debug in fase di presentazione sono da eliminare
    function inc( path ){
     
        if( mustAnswer(actual) || (lastAnswer != null)){
            let actual = dinamicActivities[counter];        
            let questionIndex = activities.indexOf(dinamicActivities[counter]);

            if(dinamicActivities[counter] === props.json.lastActivity){
                let final = props.json.lastActivity;
                final.activityText="Grazie per aver giocato :)";
                dinamicActivities.push(final);
            }
            clearInterval(timer);
            if(!Object.is(dinamicActivities[counter],props.json.lastActivity)){
            if(counter != 0){
                    now = new Date();
                    seconds = (now.getTime() - startDate.getTime()) / 1000;
                    switch(dinamicActivities[counter].widgetType){
                        case "" || "Nessuno":
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            sendData(props.playerId, activities[questionIndex].activityText, "Non ci sono risposte!", counter, seconds, 0);
                        break;
                        case "Foto": //modificate sendData
                            sendData(props.playerId, activities[questionIndex].activityText, path, counter, seconds, 0);
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        break;
                        case "Quattro opzioni" : 
                            if(dinamicActivities[counter].fourAnswers[lastAnswer].score > 0){
                                correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            } else {
                                wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            }
                            props.setPoints(props.points + eval(dinamicActivities[counter].fourAnswers[lastAnswer].score));
                            actualPoints = eval(dinamicActivities[counter].fourAnswers[lastAnswer].score);    
                            sendData(props.playerId, activities[questionIndex].activityText, dinamicActivities[counter].fourAnswers[lastAnswer].text, counter, seconds, actualPoints);
                        break;
                        case "Vero o falso":
                            let answerL = lastAnswer ? "Vero" : "Falso";
                            if(lastAnswer !== 1 && lastAnswer !== 0){ alert("Devi rispondere in tutti i casi");}//let a = dinamicActivities[1000].activityText;}
                            if(((eval(dinamicActivities[counter].trueFalseAnswer.trueScore)) > 0 ) && (answerL === "Vero")){
                                correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].trueFalseAnswer.trueScore));
                                actualPoints = eval(dinamicActivities[counter].trueFalseAnswer.trueScore);

                            }else{
                                
                                wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval( dinamicActivities[counter].trueFalseAnswer.falseScore)); 
                                actualPoints = eval(dinamicActivities[counter].trueFalseAnswer.falseScore);         
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, answerL, counter, seconds, actualPoints);
                            break;
                        case "Scelta multipla":
                            if(eval(dinamicActivities[counter].multipleAnswers[lastAnswer].score)>0){
                                console.log("risposta giusta");
                                correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].multipleAnswers[lastAnswer].score));
                                actualPoints = eval(dinamicActivities[counter].multipleAnswers[lastAnswer].score);
                            }else{
                                console.log("risposta errata");
                                wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].multipleAnswers[lastAnswer].score));
                                actualPoints = eval(dinamicActivities[counter].multipleAnswers[lastAnswer].score);    
                            }
                            break;
                        case "Range":
                            let value = eval(document.getElementById("rangenpt").value);  
                            if(value < eval(dinamicActivities[counter].rangeAnswer.end) && value > eval(dinamicActivities[counter].rangeAnswer.start) ){
                                correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].rangeAnswer.scoreOk));
                                actualPoints = eval(dinamicActivities[counter].rangeAnswer.scoreOk);

                            }else{
                                wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].rangeAnswer.scoreWrong));
                                actualPoints = eval( dinamicActivities[counter].rangeAnswer.scoreWrong);        
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, value, counter, seconds, actualPoints);
                        break;
                        case "Input testuale automatico":
                            if(document.getElementById("textAnswer").value  === dinamicActivities[counter].textAnswer.value){
                                correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points +eval( dinamicActivities[counter].textAnswer.scoreOk));
                                actualPoints = eval(dinamicActivities[counter].textAnswer.scoreOk);
                            }else{
                                wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].textAnswer.scoreWrong));
                                actualPoints = eval(dinamicActivities[counter].textAnswer.scoreWrong);        
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter,  seconds,actualPoints);
                        break;
                        case "Input testuale valutatore":
                            props.socket.emit("send-humanEvaluation",{question:  activities[questionIndex].activityText, answer: document.getElementById("textAnswer").value ,type : "text" , id : props.playerId, section : counter}); 
                            sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter, seconds, 0);
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        break;
                    }
                }
            }
            
            setCounter(counter + 1);
            setLastAnswer(null);
            document.getElementById("help-message-container").innerHTML = "";
            mediaProp = [];
            startDate = new Date();
            questionIndex = activities.indexOf(dinamicActivities[counter + 1]);
            timer = setInterval( () => {
                now = new Date();
                seconds = (now.getTime() - startDate.getTime()) / 1000;
                sendData(props.playerId, 
                    activities[questionIndex].activityText, 
                    "Nessuna risposta",
                    counter + 1, 
                    seconds );
                    props.socket.emit("data-update", props.playerId);
            }, 5000);
        }
    }
    
    
    function  mustAnswer(actual){
            switch(actual.widgetType){
                case "" || "Nessuno":
                    return true;
                case "Vero o falso":
                    return false;
                case "Scelta multipla":
                    return false;
                case "Quattro opzioni":
                    return false;
                case "Range":
                    return true;
                case "Input testuale automatico" || "Input testuale valutatore":
                    if(document.getElementById("textAnswer").value !== "")
                        return true;
                    else 
                        return false;
                case "Foto":
                    return true;
            }

        }

    function checkButton(answer){  
        if(props.v[counter].widgetType ==="Vero o falso"){    
            if(answer === 1){
                document.getElementById("btnTrue").backgroundColor = "yellow"; 
                document.getElementById("btnTrue").setAttribute("aria-selected", true);
                document.getElementById("btnFalse").backgroundColor =props.json.player.inputDiv.backgroundColor; 
                document.getElementById("btnFalse").removeAttribute("aria-selected");
                
            }else{
                document.getElementById("btnFalse").backgroundColor = "yellow"; 
                document.getElementById("btnFalse").setAttribute("aria-selected", true); 
                document.getElementById("btnTrue").backgroundColor =props.json.player.inputDiv.backgroundColor;
                document.getElementById("btnTrue").removeAttribute("aria-selected"); 
            }
        }else if(props.v[counter].widgetType ==="Quattro opzioni"){
            const nAnswer = props.v[counter].fourAnswers.lenght;
            for(let i = 0 ; i < nAnswer ;i++){
                document.getElementById("btn"+i).backgroundColor = 'white';
                document.getElementById("btn"+i).removeAttribute("aria-selected");
            }
            document.getElementById("btn"+answer).backgroundColor="yellow";  
            document.getElementById("btn"+answer).setAttribute("aria-selected", true);
        }
        setLastAnswer(answer);
    }
        
    function correctAnswerAction(dinamicActivities, counter , dictionaryActivity ,activities, actual){
        if(actual.correctAnswerGo.length === 0){
            const last = activities.length;
            dinamicActivities.push(activities[last - 1]);
            props.socket.emit('finish', {id: props.playerId, story: "Story1"});
            
        }else{
            let index = getRandomInt(0,dinamicActivities[counter].correctAnswerGo.length - 1);
            console.log("Risposta Corretta!");
            let indexOfNewActivity = dictionaryActivity.get(actual.correctAnswerGo[index]);
            dinamicActivities.push(activities[indexOfNewActivity]);
        }
    }

    function wrongAnswerAction(dinamicActivities, counter , dictionaryActivity ,activities, actual){
        if(dinamicActivities[counter].errorMessage !== ""){
            alert(dinamicActivities[counter].errorMessage);
        }
        if(actual.wrongAnswerGo.length === 0){
            const last = activities.length;
            dinamicActivities.push(activities[last - 1]);
            props.socket.emit('finish', {id: props.playerId, story: "Story1"});
        }else{
            let index = getRandomInt(0,dinamicActivities[counter].wrongAnswerGo.length -1);
            console.log("Risposta Errata!");
            let indexOfNewActivity = dictionaryActivity.get(actual.wrongAnswerGo[index])
            dinamicActivities.push(activities[indexOfNewActivity]);  
        }
    }

    const btnNext={ 	   
        display:(dinamicActivities[counter - 1] === props.json.lastActivity)? 'None' : 'block',
        fontSize:`1.2em`,
        border:'solid',
        fontFamily:props.json.player.fontFamily,
        backgroundColor: props.json.player.nextButton.backgroundColor ,
        borderRadius:`${props.json.player.nextButton.borderRadius}px`,
        borderColor:props.json.player.nextButton.frameColor,
        width:`${props.json.player.nextButton.width *screen.availWidth /202}px`,
        height:`${props.json.player.nextButton.height * screen.availHeight /437}px`,
        top:`${props.json.player.nextButton.top  * screen.availHeight/437}px`,
        left:`${props.json.player.nextButton.left* screen.availWidth /202}px`,
        color:props.json.player.nextButton.textColor,
        position:'absolute',

    }

    const textStyle = {             //implementiamo uno stile di testo unico per tutte le Storie di un attivita'
            fontSize:props.json.player.sizeFont,
            textAlign:"center",
            fontFamily:props.json.player.fontFamily
    }

    const divBorder = {
            color:props.json.player.textColor,
            textAlign:'center',
            border:'solid',
            borderRadius:props.json.player.borderRadiusFrame+'px',
            fontFamily: props.json.player.fontFamily,
            borderColor:props.json.player.frameColor,
            background:(props.json.player.textBackgroundColorActived)? props.json.player.textBackgroundColor : 'repeat', 
            height : `${dinamicActivities[counter].heightFrame* screen.availHeight / 437}px`,
            left:`${props.json.player.leftFrame* screen.availWidth /202}px`,
            width:`${props.json.player.widthFrame* screen.availWidth /202}px`,
            top:`${props.json.player.topFrame* screen.availHeight /437}px`,
            fontSize:props.json.player.sizeFont* 2,
            overflowX:'hidden',
            overflowY:'scroll',
        }

    let mediaProp = [];
        if(dinamicActivities[counter].activityImage !== ""){     
        // -->  richiesta al server per il media 
        var base64data;

        axios.get(`http://localhost:8000/downloadImage/${dinamicActivities[counter].activityImage}`, { responseType:"blob" })
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
            width:'100%'
        }
    
    if(img !== 0)
        mediaProp.push (e("img",{style:mediaStyle,key:"media",alt:dinamicActivities[counter].altActivityImage,src:img}));//controls:true,autoPlay:true}));    
    }

    /**per inserire immagini dentro o fuori il divActivity é necessario spostare il vettore mediaProp
     * o come figlio di 
     * oppure come figlio di activity e impostare i cambiamenti nel json opportuno
     */
    if (dinamicActivities[counter].widgetType === "Nessuno" || !dinamicActivities[counter].hasOwnProperty('widgetType')){   
        return e("div",null,
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, dinamicActivities[counter].activityText , mediaProp),
                    e("button", {role: "button", key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "SUCCESSIVO")
                );

    }else {

        const domanda = dinamicActivities[counter].activityText;
        const answer = dinamicActivities[counter].fourAnswers;

        if(dinamicActivities[counter].widgetType === "Quattro opzioni" || dinamicActivities[counter].widgetType === "Vero o falso"  || dinamicActivities[counter].widgetType === "Scelta multipla" ) {
                // fuorAnswers || True False || multipleAnswer
            return e("div",null,     
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, domanda,   mediaProp),
                    e(ButtonType, {answer:answer, textStyle:textStyle, domanda:domanda,lastAnswer:lastAnswer, json:props.json, counter:counter, v : dinamicActivities, checkButton : checkButton.bind(this) , btnNext:btnNext, MediaProp : mediaProp, inc:inc}
            ));

        }else { 
                //avaible Input type == 'range' || type=='text' a/v || type=="file"
            return e("div",null ,             
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, domanda,mediaProp),
                    e(inputType, { domanda:domanda, json:props.json, counter:counter, v : dinamicActivities , btnNext:btnNext, MediaProp : mediaProp, inc:inc, socket : props.socket, playerId : props.playerId}
                ));
    }
}
});

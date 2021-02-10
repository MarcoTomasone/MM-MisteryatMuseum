import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import { sendData, postOnServer} from './dataHandler.js';
import {correctAnswerAction,wrongAnswerAction,mustAnswer,checkButton,getFinalMessage} from './utilsActivity.js'
import { getButtonNextProperty,getDivBorder,getTextStyle } from './style.js';
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
    const [lastAnswer,setLastAnswer] = React.useState(null);
    const [disabled, setDisabled] = React.useState(false);
    const dinamicActivities = props.v;
    const activities = props.json.activities;
    const actual = dinamicActivities[counter];
    
    React.useImperativeHandle(ref, (value) => ({
        getSection(){
            return counter;
        },
    }));


    function inc( path ){
        
        if( mustAnswer(actual) || (lastAnswer != null)){
            let actual = dinamicActivities[counter];        
            let questionIndex = activities.indexOf(dinamicActivities[counter]);
            if(dinamicActivities[counter] === props.json.lastActivity){
                /*now = new Date();
                const date = new Date(0);
                seconds = Math.trunc ( (now.getTime() - startDate.getTime()) / 1000 );
                date.setSeconds(seconds);
                const timeString = date.toISOString().substr(11, 8);
                *///sendData(props.playerId, activities[questionIndex].activityText, "Non ci sono risposte!", counter, timeString, props.story, 0);
                let final = props.json.lastActivity;
                
                final.activityText= getFinalMessage(props.points,props.json.finalMessage);

                dinamicActivities.push(final);

            }
            clearInterval(timer);
            if(!Object.is(dinamicActivities[counter],props.json.lastActivity)){
            if(counter != 0){
                    now = new Date();
                    const date = new Date(0);
                    seconds = Math.trunc ( (now.getTime() - startDate.getTime()) / 1000 );
                    date.setSeconds(seconds);
                    const timeString = date.toISOString().substr(11, 8);
                   
                    switch(dinamicActivities[counter].widgetType){
                        case "" || "Nessuno":
                            correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            sendData(props.playerId, activities[questionIndex].activityText, "Non ci sono risposte!", counter, timeString, props.story, 0);
                        break;
                        case "Foto": //export function sendData(playerID, question, answer, section, timer, story, points){
                            sendData(props.playerId, activities[questionIndex].activityText, path, counter, timeString, props.story, 0);
                            correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            setDisabled(false);
                        break;
                        case "Quattro opzioni" : 
                            if(dinamicActivities[counter].fourAnswers[lastAnswer].score > 0){
                                correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            } else {
                                wrongAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            }
                            props.setPoints(props.points + eval(dinamicActivities[counter].fourAnswers[lastAnswer].score));
                            actualPoints = eval(dinamicActivities[counter].fourAnswers[lastAnswer].score);    
                            sendData(props.playerId, activities[questionIndex].activityText, dinamicActivities[counter].fourAnswers[lastAnswer].text, counter, timeString, props.story, actualPoints,);
                        break;
                        case "Vero o falso":
                            let answerL = lastAnswer ? "Vero" : "Falso";
                            if((eval(dinamicActivities[counter].trueFalseAnswer.trueScore) > 0 ) && (answerL === "Vero") || ((eval(dinamicActivities[counter].trueFalseAnswer.falseScore)) > 0 ) && (answerL === "Falso")){
                                correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].trueFalseAnswer.trueScore));
                                actualPoints = eval(dinamicActivities[counter].trueFalseAnswer.trueScore);

                            }else{
                                wrongAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval( dinamicActivities[counter].trueFalseAnswer.falseScore)); 
                                actualPoints = eval(dinamicActivities[counter].trueFalseAnswer.falseScore);         
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, answerL, counter, timeString,  props.story, actualPoints);
                            break;
                        case "Scelta multipla":
                            let answer;
                            if(lastAnswer === null){
                                answer = 0;
                            }else{
                                answer = lastAnswer;
                            }
                            if(eval(dinamicActivities[counter].multipleAnswers[answer].score)>0){
                                console.log("risposta giusta");
                                correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].multipleAnswers[answer].score));
                                actualPoints = eval(dinamicActivities[counter].multipleAnswers[answer].score);
                            }else{
                                console.log("risposta errata");
                                wrongAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].multipleAnswers[answer].score));
                                actualPoints = eval(dinamicActivities[counter].multipleAnswers[answer].score);    
                            }
                            sendData(props.playerId, activities[questionIndex].activityText,dinamicActivities[counter].multipleAnswers[answer].text , counter, timeString, props.story, actualPoints);
                            break;
                        case "Range":
                            let value = eval(document.getElementById("rangenpt").value);  
                            if(value <= eval(dinamicActivities[counter].rangeAnswer.end) && value >= eval(dinamicActivities[counter].rangeAnswer.start) ){
                                correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].rangeAnswer.scoreOk));
                                actualPoints = eval(dinamicActivities[counter].rangeAnswer.scoreOk);

                            }else{
                                wrongAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].rangeAnswer.scoreWrong));
                                actualPoints = eval( dinamicActivities[counter].rangeAnswer.scoreWrong);        
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, value, counter, timeString, props.story,  actualPoints);
                        break;
                        case "Input testuale automatico":
                            if(document.getElementById("textAnswer").value  === dinamicActivities[counter].textAnswer.value){
                                correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points +eval( dinamicActivities[counter].textAnswer.scoreOk));
                                actualPoints = eval(dinamicActivities[counter].textAnswer.scoreOk);
                            }else{
                                wrongAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                                props.setPoints(props.points + eval(dinamicActivities[counter].textAnswer.scoreWrong));
                                actualPoints = eval(dinamicActivities[counter].textAnswer.scoreWrong);        
                            }
                            sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter,  timeString, props.story, actualPoints);
                        break;
                        case "Input testuale valutatore":
                            props.socket.emit("send-humanEvaluation",{question:  activities[questionIndex].activityText, answer: document.getElementById("textAnswer").value ,type : "text" , id : props.playerId, section : counter}); 
                            sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter, timeString, props.story, 0);
                            correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            setDisabled(false);
                        break;
                    }
                }else{
                    if(dinamicActivities[counter] === props.json.firstActivity){
                        correctAnswerAction(props.playerId,props.story,props.socket,dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                    }
                }
            }  
            setCounter(counter + 1);
            setLastAnswer(null);
            document.getElementById("help-message-container").innerHTML = "";
            mediaProp = [];
            startDate = new Date();
            questionIndex = activities.indexOf(dinamicActivities[counter + 1]);
            if (dinamicActivities[counter] !== props.json.lastActivity) {
                timer = setInterval( () => {
                    now = new Date();
                    seconds = Math.trunc( (now.getTime() - startDate.getTime()) / 1000 );
                    const date = new Date(0);
                    date.setSeconds(seconds);
                    const timeString = date.toISOString().substr(11, 8);
                    sendData(props.playerId, activities[questionIndex].activityText, "Nessuna risposta", counter + 1, timeString, props.story);
                        props.socket.emit("data-update", props.playerId);
                }, 5000);
            }
            else {
                props.socket.emit('data-update', {id: props.playerId});
                props.socket.emit('finish', {id: props.playerId, story: props.story});
            }
        }
    }
    
    
    
    //Add Style Property
    const btnNext= getButtonNextProperty(dinamicActivities,counter,props.json);
    const textStyle = getTextStyle(props.json);
    const divBorder = getDivBorder(dinamicActivities,counter,props.json);

    let mediaProp = [];
    if(dinamicActivities[counter].activityImage !== ""){     
    // -->  richiesta al server per il media 
    var base64data;
    
    axios.get(`${props.server}/downloadImage/${dinamicActivities[counter].activityImage}`, { responseType:"blob" })
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
        mediaProp.push (e("img",{
                            style:mediaStyle,
                            key:"media",
                            alt:dinamicActivities[counter].altActivityImage,
                            src:img
                        }));    
    }

      if(dinamicActivities[counter].streamVideo !== ""){
        const videoSource = dinamicActivities[counter].streamVideo;
        let source;
        if(dinamicActivities[counter].streamVideo.indexOf('watch')>-1){
             source = videoSource.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")
            console.log(source);
        }else{
            source = videoSource.replace("https://youtu.be","https://www.youtube.com/embed");
            console.log(source);
        }

        mediaProp.push(e("iframe",{controls: true , id:'ytplayer',autoPlay: true,src:source,key:"video"}));
    }

    /**per inserire immagini dentro o fuori il divActivity é necessario spostare il vettore mediaProp
     * o come figlio di 
     * oppure come figlio di activity e impostare i cambiamenti nel json opportuno
     */
    if (dinamicActivities[counter].widgetType === "Nessuno" || !dinamicActivities[counter].hasOwnProperty('widgetType')){   
        return e("div",null,
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder},dinamicActivities[counter].activityText , mediaProp),
                    e("button", {role: "button", key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "SUCCESSIVO")
                );

    }else {

        const domanda = dinamicActivities[counter].activityText;
        const answer = dinamicActivities[counter].fourAnswers;

        if(dinamicActivities[counter].widgetType === "Quattro opzioni" || dinamicActivities[counter].widgetType === "Vero o falso"  || dinamicActivities[counter].widgetType === "Scelta multipla" ) {
                // fuorAnswers || True False || multipleAnswer
            return e("div",null,     
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, domanda,   mediaProp),
                    e(ButtonType, {answer:answer, textStyle:textStyle, domanda:domanda,lastAnswer:lastAnswer, json:props.json, counter:counter, v : dinamicActivities, checkButton : checkButton.bind(this) ,setLastAnswer:setLastAnswer, btnNext:btnNext, MediaProp : mediaProp, inc:inc}
            ));

        }else { 
                //avaible Input type == 'range' || type=='text' a/v || type=="file"
            return e("div",null ,             
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorder}, domanda,mediaProp),
                    e(inputType, { domanda: domanda,server: props.server, json:props.json, counter:counter, v : dinamicActivities , btnNext:btnNext, MediaProp : mediaProp, inc:inc, socket : props.socket, playerId : props.playerId, disabled: disabled, setDisabled: setDisabled}
                ));
    }
}
});

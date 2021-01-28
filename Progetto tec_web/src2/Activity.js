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
    //console.log(props.json);
    let actualPoints = 0;
    const counter = props.counter;
    const setCounter = props.setCounter;

    var   [img,setImg] = React.useState(0);
    var [backgroundImg, setBackgroundImg] = React.useState(0);
    const [lastAnswer,setLastAnswer] = React.useState(null);
    const dinamicActivities = props.v;
    const activities = props.json.activities;
    const activityStyle =  props.json.activityStyle;

    React.useImperativeHandle(ref, (value) => ({
        getSection(){
            return counter;
        },
    }));
    
    //lastAnswer != NULL per esigenze di Debug in fase di presentazione sono da eliminare
    function inc( path ){
        let actual = dinamicActivities[counter];
        let index = 0;
        let questionIndex = activities.indexOf(dinamicActivities[counter]);
        let indexOfNewActivity;
        

        clearInterval(timer);
            if(counter != 0){
                now = new Date();
                seconds = (now.getTime() - startDate.getTime()) / 1000;
                switch(dinamicActivities[counter].widgetType){
                    case "" || "Nessuno":
                        correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        sendData(props.playerId, activities[questionIndex].activityText, "Non ci sono risposte!", counter, seconds, 0);
                        //dinamicActivities.push(activities[questionIndex + 1]);
                    break;
                    case "Foto": //modificate sendData
                        sendData(props.playerId, activities[questionIndex].activityText, path, counter, seconds, 0);
                        correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        //dinamicActivities.push(activities[questionIndex + 1]);
                    break;
                    case "Quattro opzioni" : 
                        if(dinamicActivities[counter].fourAnswers[lastAnswer].score > 0){
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        } else {
                            wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                        }
                        props.setPoints(props.points + eval(dinamicActivities[counter].fourAnswers[lastAnswer].score));
                        actualPoints = eval(dinamicActivities[counter].fourAnswers[lastAnswer].score);    
                        //console.log(actualPoints);
                        sendData(props.playerId, activities[questionIndex].activityText, dinamicActivities[counter].fourAnswers[lastAnswer].text, counter, seconds, actualPoints);
                    break;
                    case "Vero o falso" :
                        let answer = lastAnswer ? "Vero" : "Falso";
                        if(((eval(dinamicActivities[counter].trueFalseAnswer.trueScore)) > 0 ) && (answer === "Vero")){
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            props.setPoints(props.points + eval(dinamicActivities[counter].trueFalseAnswer.trueScore));
                            actualPoints = eval(dinamicActivities[counter].trueFalseAnswer.trueScore);

                        }else{
                            wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            props.setPoints(props.points +eval( dinamicActivities[counter].trueFalseAnswer.falseScore)); 
                            actualPoints =eval(dinamicActivities[counter].trueFalseAnswer.falseScore);         
                        }
                        //console.log(actualPoints);
                        sendData(props.playerId, activities[questionIndex].activityText, answer, counter, seconds, actualPoints);
                        break;
                    case "Range":
                        let value = eval(document.getElementById("rangenpt").value);  
                        if(value < eval(dinamicActivities[counter].rangeAnswer.end) && value > eval(dinamicActivities[counter].rangeAnswer.start) ){
                            correctAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            props.setPoints(props.points + eval(dinamicActivities[counter].rangeAnswer.scoreOk));
                            actualPoints = eval(dinamicActivities[counter].rangeAnswer.scoreOk);

                        }else{
                            wrongAnswerAction(dinamicActivities,counter,props.dictionaryActivity,activities,actual);
                            props.setPoints(props.points + eval(dinamicActivities[counter].trueFalseAnswer.scoreWrong));
                            actualPoints =eval( dinamicActivities[counter].trueFalseAnswer.scoreWrong);        
                        }
                       // console.log(actualPoints);
                        sendData(props.playerId, activities[questionIndex].activityText, value, counter, seconds, actualPoints);
                    break;
                    case "Input testuale automatico":
                        if(document.getElementById("textAnswer").value  === props.v[counter].textAnswer.value){
                            index = getRandomInt(0,props.v[counter].correctAnswerGo.length-1);
                            console.log("Risposta Corretta!");
                            indexOfNewActivity = props.dictionaryActivity.get(actual.correctAnswerGo[index]);
                            props.v.push(activities[indexOfNewActivity]);
                            props.setPoints(props.points +eval( dinamicActivities[counter].textAnswer.scoreOk));
                            actualPoints = eval(dinamicActivities[counter].textAnswer.scoreOk);

                        }else{
                            index = getRandomInt(0,props.v[counter].wrongAnswerGo.length -1);
                            console.log("Risposta Errata!");
                            indexOfNewActivity = props.dictionaryActivity.get(actual.wrongAnswerGo[index]);
                            props.v.push(activities[indexOfNewActivity]);
                            props.setPoints(props.points + eval(dinamicActivities[counter].textAnswer.scoreWrong));
                            actualPoints = eval(dinamicActivities[counter].textAnswer.scoreWrong);        
                        }
                        //console.log(actualPoints);
                        sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter,  seconds,actualPoints);
                    break;
                    case "Input testuale valutatore":
                        props.socket.emit("send-humanEvaluation",{question:  activities[questionIndex].activityText, answer: document.getElementById("textAnswer").value ,type : "text" , id : props.playerId, section : counter}); 
                        sendData(props.playerId, activities[questionIndex].activityText, document.getElementById("textAnswer").value, counter, seconds, 0);
                        //dinamicActivities.push(props.json.lastActivity);
                    break;
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
    
    function checkButton(answer){  
        if(props.v[counter].widgetType ==="Vero o falso"){    
            if(answer === 1){
                document.getElementById("btnTrue").backgroundColor = "yellow"; 
                document.getElementById("btnTrue").setAttribute("aria-selected", true);
                document.getElementById("btnFalse").backgroundColor ='white'; 
                document.getElementById("btnFalse").removeAttribute("aria-selected");
                
            }else{
                document.getElementById("btnFalse").backgroundColor = "yellow"; 
                document.getElementById("btnFalse").setAttribute("aria-selected", true); 
                document.getElementById("btnTrue").backgroundColor = 'white';
                document.getElementById("btnTrue").removeAttribute("aria-selected"); 
            }
        }
        else{
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
    const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
        //borderColor:props.json.nextButton.borderColor,
        display:(dinamicActivities[counter] === props.json.lastActivity)? 'None' : 'block',
        fontSize:`1.2em`,
        fontFamily:props.json.player.fontFamily,
        backgroundColor:(dinamicActivities[counter] !== props.json.lastActivity) ? props.json.player.nextButton.backgroundColor : 'gray',
        borderRadius:`${props.json.player.nextButton.borderRadius}px`,
        borderColor:props.json.player.nextButton.frameColor,
        //width:`${data.player.chatButton.width *screen.availWidth /437}px`,
        width:`${props.json.player.nextButton.width *screen.availWidth /202}px`,
        height:`${props.json.player.nextButton.height * screen.availHeight /437}px`,
        top:`${props.json.player.nextButton.top * screen.availHeight/437 + 20}px`,
        left:`${props.json.player.nextButton.left* screen.availWidth /202}px`,
        color:props.json.player.nextButton.textColor,
        position:'absolute',

    }
    const askNav = {
        border: "solid",
        borderColor: props.json.player.frameColor,
        marginTop:"20%",
    };
    
    const textStyle = {             //implementiamo uno stile di testo unico per tutte le Storie di un attivita'
            fontSize:props.json.player.sizeFont,
            textAlign:"center",
            fontFamily:props.json.player.fontFamily
    }

//console.log(props.json.player);
//non si conosce il campo che contiene lo sfondo del riquadro dentro all'activity

    const divBorderLF = {
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
            //console.log(dinamicActivities[counter].activityImage);
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
          /*  width:`${props.json.player.image.width  *screen.availWidth /202}px`,
            height:`${props.json.player.image.height  *screen.availHeight /437}px`,
            top:`${props.json.player.image.top  *screen.availHeight /437}px`,
            left:`${props.json.player.image.left  *screen.availWidth /202}px`,
            */
           
           // position:'absolute'
        }
    
    if(img !== 0)
        mediaProp.push (e("img",{style:mediaStyle,key:"media",alt:dinamicActivities[counter].alternativeText,src:img}));//controls:true,autoPlay:true}));    
    }

    /**per inserire immagini dentro o fuori il divActivity é necessario spostare il vettore mediaProp
     * o come figlio di 
     * oppure come figlio di activity e impostare i cambiamenti nel json opportuno
     */
    if (dinamicActivities[counter].widgetType === "Nessuno" || !dinamicActivities[counter].hasOwnProperty('widgetType')){   
        return e("div",null,
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorderLF}, dinamicActivities[counter].activityText , mediaProp),
                    e("button", {role: "button", key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "SUCCESSIVO")
                );

    }else {
        //console.log(dinamicActivities[counter]);
        const domanda = dinamicActivities[counter].activityText;
        const answer = dinamicActivities[counter].fourAnswers;

        if(dinamicActivities[counter].widgetType === "Quattro opzioni" || dinamicActivities[counter].widgetType === "Vero o falso") {
                // fuorAnswers || true\false
            return e("div",null,     
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorderLF}, domanda,   mediaProp),
                    e(ButtonType, {answer:answer, askNav:askNav, textStyle:textStyle, domanda:domanda,lastAnswer:lastAnswer, json:props.json, counter:counter, v : dinamicActivities, checkButton : checkButton.bind(this) , btnNext:btnNext, MediaProp : mediaProp, inc:inc}
            ));
        }else { 
                //avaible Input type == 'range' || type=='text' || type=="file"
            return e("div",null ,             
                    e("div", {key: "activitIntro", id:"activitIntro", style: divBorderLF}, domanda,mediaProp),
                    e(inputType, { domanda:domanda, json:props.json, counter:counter, v : dinamicActivities , btnNext:btnNext, MediaProp : mediaProp, inc:inc, socket : props.socket, playerId : props.playerId}
                ));
    }
}
});

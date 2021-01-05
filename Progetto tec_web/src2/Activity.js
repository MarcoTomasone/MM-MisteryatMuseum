import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import {loadHelpMessage} from '../utils.js';
import { sendData } from './dataHandler.js';
const e = React.createElement;

/**         Activity 
 * contains the interactive activities 
 * state[Counter]   <-- number of activity from v[] {dinamic Array}
 * v[counter + 1 ] contains the next activity
 * every element on v[i] is a copy from props.json.accessibility
 * 
 * @param{json:data,  v : activityList}
 */
 function Activity(props) {

        const [counter,setCounter] = React.useState(0);
        var [img,setImg] = React.useState(0);

        function inc(){   
            

            if(props.v[counter + 1] === undefined)
            //props.v.push(props.json.accessibility.activities[counter])
            if(counter + 1 <= props.v.length){
                props.v.push(props.json.accessibility.activities[counter + 1 % props.json.accessibility.activities.length]);
            } 
            if(counter >= props.json.accessibility.activities.length -2 ){
                props.v.push(props.json.accessibility.activities[props.json.accessibility.activities.length -1])
                document.getElementById("nextButton").style.backgroundColor="grey";
            }
            setCounter(counter+ 1);
            loadHelpMessage(props, counter +1);
            MediaProp = [];             // Contains React Element type: Media
            if(props.v[counter].type_ === "Quattro opzioni" && counter > 0){
                for(let i = 0; i < props.v[counter].multipleAnswer.length; i++)
                    document.getElementById("btn"+i).style.backgroundColor=props.v[counter].btnStyle.bckgrndClr;
            } 
        }

        function checkButton(answer){
            console.log("ciao");
            const activities = props.json.accessibility.activities;
            let index = 0;
            let questionIndex = activities.indexOf(props.v[counter]);
            let actual = props.v[counter];
            switch(answer){
            case -2:
                let value = document.getElementById("rangenpt").value; 
                console.log(value); 
                sendData(props.playerId, activities[questionIndex].question, value, counter );
                break;
            case -1 :
                //getData(document.getElementById("textAnswer").value, json, questionIndex, counter);
                sendData(props.playerId, activities[questionIndex].question, document.getElementById("textAnswer").value, counter );
                if(document.getElementById("textAnswer").value  === props.v[counter].textAnswer.value){
                    index = getRandomInt(0,props.v[counter].correctAnswerGo.length-1);
                    console.log("Risposta Corretta!");
                    props.v.push(activities[actual.correctAnswerGo[index]]);
                }else{
                    index = getRandomInt(0,props.v[counter].wrongAnswerGo.length -1);
                    console.log("Risposta Errata!");
                    props.v.push(activities[actual.wrongAnswerGo[index]]);
                }
                break;
            case props.v[counter].correct:
                console.log("answer")
                console.log(answer)
                sendData(props.playerId, activities[questionIndex].question,props.v[counter].multipleAnswer[answer] , counter );
                index = getRandomInt(0,props.v[counter].correctAnswerGo.length - 1);
                document.getElementById("btn" + answer).style.backgroundColor = "green";        
                props.v.push(activities[actual.correctAnswerGo[index]]);
                console.log("risposta corretta");
                break;
            default :
                console.log(answer)
                sendData(props.playerId, activities[questionIndex].question,props.v[counter].multipleAnswer[answer] , counter );
                index = getRandomInt(0,props.v[counter].wrongAnswerGo.length -1);
                document.getElementById("btn"+answer).style.backgroundColor = "red";
                props.v.push(activities[actual.wrongAnswerGo[index]]);
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

        const divActivity = {     //style della div contenente le activity
            border:props.json.accessibility.activityStyle.divisor.border,
            overflow:"scroll",
            borderColor: props.json.accessibility.activityStyle.divisor.borderColor,
            left:`${props.json.accessibility.activityStyle.divisor.left* screen.availWidth /202}px`,
            width:`${props.json.accessibility.activityStyle.divisor.width *screen.availWidth /437}px`,
            height:`${props.json.accessibility.activityStyle.divisor.height * screen.availHeight /202}px`,
            top:`${props.json.accessibility.activityStyle.divisor.top * screen.availHeight /437}px`,
            position:'absolute',
          
        };

        let MediaProp = [];
        let mediaStyle;
                
        if(props.v[counter].media === "img"){     
            // -->  richiesta al server per il media 
            var base64data;

   	axios.get(`http://localhost:8000/downloadImage/${props.v[counter].source}`, { responseType:"blob" })
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
            mediaStyle = {
                width:`${props.v[counter].styleM.width  *screen.availWidth /202}px`,
                height:`${props.v[counter].styleM.height  *screen.availHeight /437}px`,
                bottom:`${props.v[counter].styleM.bottom  *screen.availHeight /437}px`,
                left:`${props.v[counter].styleM.left  *screen.availWidth /202}px`,
                position:'absolute'
            }
        
        if(img !== 0)
            MediaProp.push (e("img",{style:mediaStyle,key:"media",alt:props.v[counter].alternativeText,src:img}));//controls:true,autoPlay:true}));
         
        }
           
        if (props.v[counter].widgetType === "" ){
   
            return e("div",{key:"divCont"},
                        e("div", {key: "activitIntro", id:"activitIntro", style: divActivity}, props.v[counter].question, MediaProp ),
                        e("button", {key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "NEXT")
                    );
        


        } else {
            let domanda = props.v[counter].question;
            let answer = props.v[counter].multipleAnswer;
    
            if(props.v[counter].widgetType === "Quattro opzioni" || props.v[counter].widgetType === "Vero Falso") {
                    // multiple answer || true\false

                return e(ButtonType, {answer:answer, askNav:askNav, textStyle:textStyle, domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
            
            }else { 
                    //avaible Input type == 'range' || type=='text' || type=="file"
                
                    return e(inputType, { domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
        }
    }
}
    

function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
/*function checkButton(counter, answer, json, v){
    let index = 0;
    let questionIndex = json.indexOf(v[counter]);
    let actual = v[counter];
    switch(answer){
    case -2:
        let value =document.getElementById("rangenpt").value; 
        console.log(value); 
        getData(value,json, questionIndex, counter);
        break;
    case -1 :
        getData(document.getElementById("textAnswer").value, json, questionIndex, counter);
        if(document.getElementById("textAnswer").value  === v[counter].textAnswer.value){
            index = getRandomInt(0,v[counter].correctAnswerGo.length-1);
            console.log("Risposta Corretta!");
            v.push(json[actual.correctAnswerGo[index]]);
        }else{
            index = getRandomInt(0,v[counter].wrongAnswerGo.length -1);
            console.log("Risposta Errata!");
            v.push(json[actual.wrongAnswerGo[index]]);
        }
        break;
    case v[counter].correct:
        getData(v[counter].multipleAnswer[answer], json, questionIndex, counter);
        index = getRandomInt(0,v[counter].correctAnswerGo.length-1);
        document.getElementById("btn"+answer).style.backgroundColor = "green";        
        v.push(json[actual.correctAnswerGo[index]]);
        console.log("risposta corretta");
        break;
    default :
        getData(v[counter].multipleAnswer[answer], json, questionIndex, counter);
        index = getRandomInt(0,v[counter].wrongAnswerGo.length -1);
        document.getElementById("btn"+answer).style.backgroundColor = "red";
        v.push(json[actual.wrongAnswerGo[index]]);
    }
    console.log(v);
}*/
export default Activity;
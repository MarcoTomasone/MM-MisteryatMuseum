import ButtonType from './ButtonType.js';
import inputType from './InputType.js';
import {loadHelpMessage} from '../utils.js';
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
        
        function inc(){    
 
            //aggiungerá il prossimo mettere la condizione se é vuoto
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
                
        if(props.v[counter].media !== 0){     
            // -->  richiesta al server per il media          
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
                        e("button", {key:"buttonNext", id: "nextButton", style:btnNext, onClick:inc}, "NEXT")
                    );
        


        } else {
            let domanda = props.v[counter].question;
            let answer = props.v[counter].answer;
    
            if(props.v[counter].type_ === "button") {
                    // multiple answer || true\false

                return e(ButtonType, {answer:answer, askNav:askNav, textStyle:textStyle, domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
            
            }else { 
                    //avaible Input type == 'range' || type=='text' || type=="file"
                
                    return e(inputType, { domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc});
        }
    }
}
    

/**
    function checkButton(counter, answer, json, v){         //the function check the answer with the answer given from json file

        if(answer === -1){      //INPUT TYPE == TEXT
            if(document.getElementById("textAnswer").value  ===v[counter].correct ){

                getActivity(1,v,counter,json);

                console.log("TextInsert Correct");
            }
            else {
                
                getActivity(0,v,counter,json);

                console.log("TextInsert Wrong");
            }
            
        }
        else if(answer === -2) {    //INPUT TYPE == RANGE 
          
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


        }
        else {
            getActivity(0,v,counter,json);
            console.log("Risposta Errata");
            document.getElementById("btn"+answer).style.backgroundColor =  v[counter].btnStyle.bckgrndClrW;

        }
  
}
//giochi con le posizione dell'array

function getActivity(correct,v,counter,json){                //EVERY ACTIVITY CHANGE WAY ACCORDING TO THE USER'S ANSWER
 
if(correct === 1){              //fare in modo che le ultime attivita accettino la risposta ma non aggiungano nuove attivita
           let appo = v[counter + 1];

           let correctWay= v[counter].correctAnswerGo;
           let length = correctWay.length;
           let index = getRandomInt(0,length- 1);
           v[counter+1] = json[correctWay[index]];

           v.push(appo);

        }else{
        let appo = v[counter + 1];
     
        //TEST
        let errorWay= v[counter].wrongAnswerGo;
        let length = errorWay.length;
        let index = getRandomInt(0,length- 1);
        
        v[counter+1] = json[errorWay[index]];
        v.push(appo);

    }
}
*/
function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}


//0 3 ==> errore
function checkButton(counter, answer ,json,v){
    
    if(answer === -2){
        let value =document.getElementById("rangenpt").value; 
        console.log(value); 
    }else if(answer === -1){

        if(document.getElementById("textAnswer").value  === v[counter].correct){
            let index = getRandomInt(0,v[counter].correctAnswerGo.length);
            console.log("Risposta Corretta!");
            v.push(json[index]);

        }else{
            let index = getRandomInt(0,v[counter].wrongAnswerGo.length);
            console.log("Risposta Errata!");
            v.push(json[index]);
        }
        console.log(v);
    }else if(answer === v[counter].correct){
        let index = getRandomInt(0,v[counter].correctAnswerGo.length);
        document.getElementById("btn"+answer).style.backgroundColor = "green";
        v.push(json[index]);
        console.log("risposta corretta")
        }else{
            let index = getRandomInt(0,v[counter].wrongAnswerGo.length);
            console.log("Risposta Errata");
            document.getElementById("btn"+answer).style.backgroundColor = "red";
            v.push(json[index]);
        }
}

 
export default Activity;
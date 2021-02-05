import { getRandomInt} from '../utils.js';

export function correctAnswerAction(playerId,story,socket,dinamicActivities, counter , dictionaryActivity ,activities, actual){
    if(actual.correctAnswerGo.length === 0){
        const last = activities.length;
        dinamicActivities.push(activities[last - 1]);
        //socket.emit('finish', {id: playerId, story: story});
        
    }else{
        let index = getRandomInt(0,dinamicActivities[counter].correctAnswerGo.length - 1);
        let indexOfNewActivity = dictionaryActivity.get(actual.correctAnswerGo[index]);
        dinamicActivities.push(activities[indexOfNewActivity]);
    }
}

export function wrongAnswerAction(playerId,story,socket,dinamicActivities, counter , dictionaryActivity ,activities, actual){
    if(dinamicActivities[counter].errorMessage !== ""){
        alert(dinamicActivities[counter].errorMessage);
    }
    if(actual.wrongAnswerGo.length === 0){
        const last = activities.length;
        dinamicActivities.push(activities[last - 1]);
        //socket.emit('finish', {id: playerId, story: story});
    }else{
        let index = getRandomInt(0,dinamicActivities[counter].wrongAnswerGo.length -1);
        console.log("Risposta Errata!");
        let indexOfNewActivity = dictionaryActivity.get(actual.wrongAnswerGo[index])
        dinamicActivities.push(activities[indexOfNewActivity]);  
    }
}

export function  mustAnswer(actual){
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
        case "Input testuale automatico":
            if(document.getElementById("textAnswer").value !== "")
                return true;
            else 
                return false;
        case "Input testuale valutatore":
            if(document.getElementById("textAnswer").value !== "")
                return true;
            else 
                return false;
        case "Foto":
            return true;
    }
}

export function checkButton(answer,dinamicActivities,counter,setLastAnswer,json){  
    if(dinamicActivities[counter].widgetType ==="Vero o falso"){    
        if(answer === 1){
            document.getElementById("btnTrue").backgroundColor = "yellow"; 
            document.getElementById("btnTrue").setAttribute("aria-selected", true);
            document.getElementById("btnFalse").backgroundColor = json.player.inputDiv.backgroundColor; 
            document.getElementById("btnFalse").removeAttribute("aria-selected");
            
        }else{
            document.getElementById("btnFalse").backgroundColor = "yellow"; 
            document.getElementById("btnFalse").setAttribute("aria-selected", true); 
            document.getElementById("btnTrue").backgroundColor =json.player.inputDiv.backgroundColor;
            document.getElementById("btnTrue").removeAttribute("aria-selected"); 
        }
    }else if(dinamicActivities[counter].widgetType ==="Quattro opzioni"){
        const nAnswer = dinamicActivities[counter].fourAnswers.lenght;
        for(let i = 0 ; i < nAnswer ;i++){
            document.getElementById("btn"+i).backgroundColor = 'white';
            document.getElementById("btn"+i).removeAttribute("aria-selected");
        }
        document.getElementById("btn"+answer).backgroundColor="yellow";  
        document.getElementById("btn"+answer).setAttribute("aria-selected", true);
    }
    setLastAnswer(answer);
}
//get id from the Dialog and write it on the JSON FILE
export function getID(playerID, story, question){
    const date = new Date(0);
    date.setSeconds(0);
    const timeString = date.toISOString().substr(11, 8);
    const player = {
        section : 0,
        question, 
        answer: "Nessuna Risposta",
        points: 0,
        timer : timeString
    }
    axios.post(`http://localhost:8000/updateData`, {id: playerID, name: "", sectionArray: player, story : story});
}
//get answer and question from the Dialog and write it on the JSON FILE
export function sendData(playerID, question, answer, section, timer, story, points){
    const player = {
        section,
        question,
        answer,
        points, 
        timer
    }
    axios.post(`http://localhost:8000/updateData`, {id: playerID, sectionArray: player, story : story});
}
export function postOnServer(playerID, story){
    axios.post('http://localhost:8000/postJson', {id : playerID, story : story})
}



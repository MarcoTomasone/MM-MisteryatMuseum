//get id from the Dialog and write it on the JSON FILE
export function getID(playerID, story, question){
    const player = {
        section : 0,
        question, 
        answer: "Nessuna Risposta",
        points: 0,
        timer : 0
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


